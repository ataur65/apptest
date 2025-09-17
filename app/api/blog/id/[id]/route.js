import connectDB from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return NextResponse.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(blogPost);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}