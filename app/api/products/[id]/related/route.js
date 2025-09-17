import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }, // Exclude the current product
    }).limit(5); // Limit to 5 related products

    return NextResponse.json(relatedProducts);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}