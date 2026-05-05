import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import College from '@/models/College';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const location = searchParams.get('location');
    const maxFees = searchParams.get('maxFees');

    const query: any = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (maxFees) {
      query.fees = { $lte: Number(maxFees) };
    }

    const colleges = await College.find(query).sort({ rating: -1 });
    
    return NextResponse.json(colleges);
  } catch (error: any) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 });
  }
}
