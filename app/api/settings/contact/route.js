import connectDB from '@/lib/db';
import ContactSettings from '@/lib/models/ContactSettings';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    let settings = await ContactSettings.findOne();
    if (!settings) {
      // If no settings exist, create a new one with default values
      const newSettings = new ContactSettings();
      await newSettings.save();
      settings = newSettings;
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching contact settings', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectDB();
  const { address, phone, email } = await request.json();

  try {
    let settings = await ContactSettings.findOne();
    if (!settings) {
      settings = new ContactSettings();
    }
    settings.address = address;
    settings.phone = phone;
    settings.email = email;
    await settings.save();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating contact settings', error: error.message },
      { status: 500 }
    );
  }
}