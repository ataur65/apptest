import connectDB from '@/lib/db';
import Contact from '@/lib/models/Contact';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();
  const body = await request.json();

  try {
    const contact = new Contact(body);
    await contact.save();
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  await connectDB();

  try {
    const contacts = await Contact.find({});
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}