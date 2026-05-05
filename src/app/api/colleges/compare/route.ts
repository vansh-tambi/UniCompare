import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import College from '@/models/College';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');

    if (!ids) {
      return NextResponse.json({ error: 'No college IDs provided for comparison' }, { status: 400 });
    }

    const idArray = ids.split(',').filter(id => id.trim() !== '');
    
    const colleges = await College.find({ _id: { $in: idArray } });
    
    return NextResponse.json(colleges);
  } catch (error: any) {
    console.error('Error comparing colleges:', error);
    return NextResponse.json({ error: 'Failed to fetch colleges for comparison' }, { status: 500 });
  }
}
