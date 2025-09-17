import connectDB from '@/lib/db';
import MenuItem from '@/lib/models/MenuItem';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();
  const { parentId, childName, childPage } = await request.json();

  try {
    const menuItem = await MenuItem.findById(parentId);

    if (!menuItem) {
      return NextResponse.json({ success: false, error: 'Menu item not found' }, { status: 404 });
    }

    menuItem.children.push({
      name: childName,
      page: childPage,
    });

    await menuItem.save();

    return NextResponse.json({ success: true, data: menuItem });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}