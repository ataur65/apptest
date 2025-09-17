import connectDB from '@/lib/db';
import MenuItem from '@/lib/models/MenuItem';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    const menuItems = await MenuItem.find();
    return NextResponse.json({ success: true, data: menuItems });
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
    const menuItem = await MenuItem.create(body);
    return NextResponse.json({ success: true, data: menuItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 400 }
    );
  }
}