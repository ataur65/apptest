import connectDB from '@/lib/db';
import NewsletterSubscription from '@/lib/models/NewsletterSubscription';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const subscription = await NewsletterSubscription.findById(id);
    if (!subscription) {
      return NextResponse.json(
        { message: 'Subscription not found' },
        { status: 404 }
      );
    }
    await subscription.deleteOne();
    return NextResponse.json({ message: 'Subscription deleted' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}