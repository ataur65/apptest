import connectDB from '@/lib/db';
import Contact from '@/lib/models/Contact';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json(
        { message: 'Contact not found' },
        { status: 404 }
      );
    }
    await contact.deleteOne();
    return NextResponse.json({ message: 'Contact deleted' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}