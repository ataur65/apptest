import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    const users = await User.find({}).select('-password'); // Exclude password
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}