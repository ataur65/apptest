import connectDB from '@/lib/db';
import MenuItem from '@/lib/models/MenuItem';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = params;
  const body = await request.json();

  try {
    const menuItem = await MenuItem.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!menuItem) {
      return NextResponse.json({ success: false, message: 'Menu item not found' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: menuItem });
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
    const menuItem = await MenuItem.findByIdAndDelete(id);

    if (!menuItem) {
      return NextResponse.json({ success: false, message: 'Menu item not found' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 400 }
    );
  }
}