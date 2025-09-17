import connectDB from '@/lib/db';
import SocialLink from '@/lib/models/SocialLink';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = params;
  const body = await request.json();

  try {
    const socialLink = await SocialLink.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!socialLink) {
      return NextResponse.json({ success: false, message: 'Social link not found' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: socialLink });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const socialLink = await SocialLink.findByIdAndDelete(id);

    if (!socialLink) {
      return NextResponse.json({ success: false, message: 'Social link not found' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 400 }
    );
  }
}