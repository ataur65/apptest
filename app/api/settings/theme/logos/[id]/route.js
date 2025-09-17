import connectDB from '@/lib/db';
import ThemeSetting from '@/lib/models/ThemeSetting';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const settings = await ThemeSetting.findOneAndUpdate(
      {},
      { $pull: { clientLogos: { _id: id } } },
      { new: true }
    );
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}