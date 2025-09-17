import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const user = await User.findById(id);

    if (user) {
      await user.deleteOne();
      return NextResponse.json({ message: 'User removed' });
    } else {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}