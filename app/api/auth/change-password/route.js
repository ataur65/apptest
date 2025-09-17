import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  await connectDB();
  const { userId, currentPassword, newPassword } = await request.json();

  try {
    const user = await User.findById(userId);

    if (user && (await user.matchPassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
      return NextResponse.json({ message: 'Password updated successfully' });
    } else {
      return NextResponse.json(
        { message: 'Invalid current password or user not found' },
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