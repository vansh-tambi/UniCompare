import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import College from '@/models/College';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { exam, rank } = body;

    if (!exam || !rank) {
      return NextResponse.json({ error: 'Exam and rank are required' }, { status: 400 });
    }

    const rankNum = Number(rank);
    const examType = exam.includes('NEET') ? 'NEET' : 'JEE';

    // Predict based on cutoff rank: user rank should be less than or equal to closing rank
    // We search for colleges where the closing rank (cutoffRank) is >= user rank
    const matches = await College.find({ 
      examType: examType,
      cutoffRank: { $gte: rankNum } 
    })
    .sort({ cutoffRank: 1 }) // Show most competitive first
    .limit(3);
    
    // Add AI/rule-generated rationale
    const matchesWithRationale = matches.map(match => {
      const matchObj = match.toObject();
      let rationale = '';
      
      const safetyMargin = matchObj.cutoffRank - rankNum;
      
      if (safetyMargin < 100) {
        rationale = `Your rank of ${rankNum} is very close to the previous closing rank of ${matchObj.cutoffRank}. This is a highly competitive 'Reach' option for you.`;
      } else if (safetyMargin < 1000) {
        rationale = `${matchObj.name} is a strong 'Target' option. With a cutoff of ${matchObj.cutoffRank}, you have a solid chance of admission.`;
      } else {
        rationale = `With your rank of ${rankNum}, ${matchObj.name} (Cutoff: ${matchObj.cutoffRank}) is a very safe 'Likely' option with high probability of admission.`;
      }
      
      return { ...matchObj, rationale };
    });

    return NextResponse.json(matchesWithRationale);
  } catch (error: any) {
    console.error('Error predicting colleges:', error);
    return NextResponse.json({ error: 'Failed to predict colleges' }, { status: 500 });
  }
}
