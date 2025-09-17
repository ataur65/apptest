import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();
  const { username, password } = await request.json();

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      return NextResponse.json({
        _id: user._id,
        username: user.username,
        role: user.role,
      });
    } else {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}