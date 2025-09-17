import connectDB from '@/lib/db';
import Category from '@/lib/models/Category';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectDB();
  const { name, imageUrl } = await request.json();

  try {
    const category = await Category.findOneAndUpdate(
      { name },
      { imageUrl },
      { new: true, upsert: true } // Create if not exists
    );
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}