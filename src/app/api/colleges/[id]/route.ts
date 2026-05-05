import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import College from '@/models/College';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    const college = await College.findById(id);

    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }
    
    return NextResponse.json(college);
  } catch (error: any) {
    console.error('Error fetching college by ID:', error);
    return NextResponse.json({ error: 'Failed to fetch college details' }, { status: 500 });
  }
}
