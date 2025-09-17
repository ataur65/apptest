import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();
  const { username, password, role } = await request.json();

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    const user = await User.create({
      username,
      password,
      role,
    });

    if (user) {
      return NextResponse.json(
        {
          _id: user._id,
          username: user.username,
          role: user.role,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: 'Invalid user data' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}