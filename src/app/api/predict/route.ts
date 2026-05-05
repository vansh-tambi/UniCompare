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
    let examType: 'JEE_MAIN' | 'JEE_ADVANCED' | 'NEET' = 'JEE_MAIN';
    if (exam === 'JEE Advanced') examType = 'JEE_ADVANCED';
    else if (exam === 'NEET') examType = 'NEET';

    // Predict based on cutoff rank: user rank should be less than or equal to closing rank
    const matches = await College.find({ 
      examType: examType,
      cutoffRank: { $gte: rankNum } 
    })
    .sort({ cutoffRank: 1 }) // Show most competitive first
    .limit(5);
    
    // Add AI/rule-generated rationale
    const matchesWithRationale = matches.map(match => {
      const matchObj = match.toObject();
      let tag = 'Target';
      let rationale = '';
      
      const ratio = rankNum / matchObj.cutoffRank;

      if (ratio > 0.9) {
        tag = 'Reach';
        rationale = `Highly competitive. Your rank of ${rankNum} is very close to the closing rank of ${matchObj.cutoffRank.toLocaleString()}.`;
      } else if (ratio < 0.4) {
        tag = 'Safe';
        rationale = `Very high probability. Your rank is significantly better than the historical cutoff of ${matchObj.cutoffRank.toLocaleString()}.`;
      } else {
        tag = 'Target';
        rationale = `Good probability. You are comfortably within the historical cutoff of ${matchObj.cutoffRank.toLocaleString()}.`;
      }
      
      return { ...matchObj, rationale, tag };
    });

    return NextResponse.json(matchesWithRationale);
  } catch (error: any) {
    console.error('Error predicting colleges:', error);
    return NextResponse.json({ error: 'Failed to predict colleges' }, { status: 500 });
  }
}
