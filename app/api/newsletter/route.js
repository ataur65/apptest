import connectDB from '@/lib/db';
import NewsletterSubscription from '@/lib/models/NewsletterSubscription';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    const subscriptions = await NewsletterSubscription.find();
    return NextResponse.json(subscriptions);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}