import connectDB from '@/lib/db';
import Category from '@/lib/models/Category';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  await connectDB();
  const { name } = params;

  try {
    const category = await Category.findOneAndDelete({ name });
    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: 'Category image deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}