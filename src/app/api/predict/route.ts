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
    let minRating = 0;

    // Rule-based logic mapping rank to a rating tier
    if (rankNum <= 5000) {
      minRating = 4.8; // Top tier (e.g., IITs, BITS)
    } else if (rankNum <= 20000) {
      minRating = 4.5; // High tier (e.g., NITs, DTU, IIITs)
    } else if (rankNum <= 50000) {
      minRating = 4.2; // Mid-high tier (e.g., MIT, VIT)
    } else {
      minRating = 4.0; // Standard tier
    }

    const matches = await College.find({ rating: { $gte: minRating } })
      .sort({ rating: -1, fees: 1 })
      .limit(3);
    
    // Add AI/rule-generated rationale
    const matchesWithRationale = matches.map(match => {
      const matchObj = match.toObject();
      let rationale = '';
      if (rankNum <= 5000) {
        rationale = `With a top-tier rank of ${rank}, ${match.name} is an excellent target due to its premier status and ${match.rating} rating.`;
      } else if (rankNum <= 20000) {
        rationale = `Your rank of ${rank} makes ${match.name} a strong contender, offering great value and a high rating of ${match.rating}.`;
      } else {
        rationale = `${match.name} is a solid, realistic option for your rank profile, offering good placements and academic quality.`;
      }
      return { ...matchObj, rationale };
    });

    return NextResponse.json(matchesWithRationale);
  } catch (error: any) {
    console.error('Error predicting colleges:', error);
    return NextResponse.json({ error: 'Failed to predict colleges' }, { status: 500 });
  }
}
