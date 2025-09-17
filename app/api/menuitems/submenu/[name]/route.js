import connectDB from '@/lib/db';
import MenuItem from '@/lib/models/MenuItem';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  await connectDB();
  const { name } = params;

  try {
    // Find all menu items that have a child with the given name
    const menuItems = await MenuItem.find({ 'children.name': name });

    if (menuItems.length === 0) {
      return NextResponse.json({ success: false, error: 'Submenu item not found' }, { status: 404 });
    }

    // Remove the child from each found menu item
    for (const menuItem of menuItems) {
      menuItem.children = menuItem.children.filter(child => child.name !== name);
      await menuItem.save();
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}