import connectDB from '@/lib/db';
import MegaDiscount from '@/lib/models/MegaDiscount';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const megaDiscount = await MegaDiscount.findById(id);
    if (!megaDiscount) {
      return NextResponse.json(
        { message: 'Mega discount not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(megaDiscount);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = params;
  const body = await request.json();

  try {
    const megaDiscount = await MegaDiscount.findById(id);
    if (!megaDiscount) {
      return NextResponse.json(
        { message: 'Mega discount not found' },
        { status: 404 }
      );
    }

    if (body.title != null) megaDiscount.title = body.title;
    if (body.subtitle != null) megaDiscount.subtitle = body.subtitle;
    if (body.image != null) megaDiscount.image = body.image;
    if (body.buttonText != null) megaDiscount.buttonText = body.buttonText;
    if (body.buttonLink != null) megaDiscount.buttonLink = body.buttonLink;

    const updatedMegaDiscount = await megaDiscount.save();
    return NextResponse.json(updatedMegaDiscount);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const megaDiscount = await MegaDiscount.findById(id);
    if (!megaDiscount) {
      return NextResponse.json(
        { message: 'Mega discount not found' },
        { status: 404 }
      );
    }

    await megaDiscount.deleteOne();
    return NextResponse.json({ message: 'Mega discount deleted' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}