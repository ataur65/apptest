import connectDB from '@/lib/db';
import SocialLink from '@/lib/models/SocialLink';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    const socialLinks = await SocialLink.find();
    return NextResponse.json({ success: true, data: socialLinks });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();

  try {
    const socialLink = await SocialLink.create(body);
    return NextResponse.json({ success: true, data: socialLink }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 400 }
    );
  }
}