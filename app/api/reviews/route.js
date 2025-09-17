import connectDB from '@/lib/db';
import Review from '@/lib/models/Review';
import Product from '@/lib/models/Product';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();
  const body = await request.json();

  const review = new Review({
    product: body.product,
    user: body.user,
    rating: body.rating,
    comment: body.comment,
  });

  try {
    const newReview = await review.save();

    // Update product rating and review count
    const reviews = await Review.find({ product: newReview.product });
    const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
    const newRating = totalRating / reviews.length;

    await Product.findByIdAndUpdate(newReview.product, {
      rating: newRating,
      reviewCount: reviews.length,
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 400 }
    );
  }
}