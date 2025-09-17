import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  await connectDB();
  const { name } = params;

  try {
    await Product.updateMany({ brand: name }, { $set: { brand: null } });
    return NextResponse.json({ message: `Brand '${name}' deleted and disassociated from products.` });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}