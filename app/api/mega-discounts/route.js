import connectDB from '@/lib/db';
import MegaDiscount from '@/lib/models/MegaDiscount';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    const megaDiscounts = await MegaDiscount.find();
    return NextResponse.json(megaDiscounts);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();

  const megaDiscount = new MegaDiscount({
    title: body.title,
    subtitle: body.subtitle,
    image: body.image,
    buttonText: body.buttonText,
    buttonLink: body.buttonLink,
  });

  try {
    const newMegaDiscount = await megaDiscount.save();
    return NextResponse.json(newMegaDiscount, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid mega discount data', error: error.message },
      { status: 400 }
    );
  }
}