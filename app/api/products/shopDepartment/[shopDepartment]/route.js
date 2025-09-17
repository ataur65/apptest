import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await connectDB();
  const { shopDepartment } = params;

  try {
    const products = await Product.find({ shopDepartment: shopDepartment });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}