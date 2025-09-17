import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    const saleProducts = await Product.find({ isSale: true });
    return NextResponse.json(saleProducts);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}