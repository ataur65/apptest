import connectDB from '@/lib/db';
import Review from '@/lib/models/Review';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await connectDB();
  const { productId } = params;

  try {
    const reviews = await Review.find({ product: productId });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}