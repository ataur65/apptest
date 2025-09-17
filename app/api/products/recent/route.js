import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(3);
    return NextResponse.json(recentProducts);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}