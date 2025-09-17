import connectDB from '@/lib/db';
import NewsletterSubscription from '@/lib/models/NewsletterSubscription';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();
  const { email } = await request.json();

  try {
    // Check if email already exists
    let subscription = await NewsletterSubscription.findOne({ email });
    if (subscription) {
      return NextResponse.json(
        { message: 'Email already subscribed' },
        { status: 409 }
      );
    }

    subscription = new NewsletterSubscription({ email });
    await subscription.save();

    return NextResponse.json({ message: 'Subscription successful!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}