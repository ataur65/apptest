import connectDB from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    const categories = await BlogPost.distinct('category');
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}