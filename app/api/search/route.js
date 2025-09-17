import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import BlogPost from '@/lib/models/BlogPost';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { message: 'Search query is required' },
        { status: 400 }
      );
    }

    const searchRegex = new RegExp(query, 'i'); // Case-insensitive search

    // Search products by name or description
    const products = await Product.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { shortDescription: searchRegex }, // Include shortDescription in search
      ],
    });

    // Search blog posts by title or content or excerpt
    const blogPosts = await BlogPost.find({
      $or: [
        { title: searchRegex },
        { content: searchRegex },
        { excerpt: searchRegex }, // Include excerpt in search
      ],
    });

    return NextResponse.json({ products, blogPosts });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}