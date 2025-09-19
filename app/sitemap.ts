import { MetadataRoute } from 'next';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import BlogPost from '@/lib/models/BlogPost';

const URL = 'https://my-affiliatapp-8.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  const staticRoutes = [
    '',
    '/products',
    '/contact',
    '/login',
    '/blog',
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
  }));

  // Fetch dynamic product routes
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const products = await Product.find({}, '_id updatedAt').limit(1000);
    productUrls = products.map((product: { _id: string; updatedAt?: Date }) => ({
      url: `${URL}/product/${product._id}`,
      lastModified: product.updatedAt || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  // Fetch dynamic blog routes
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const blogPosts = await BlogPost.find({}, 'slug date').limit(1000);
    blogUrls = blogPosts.map((post: { slug: string; date?: Date }) => ({
      url: `${URL}/blog/${post.slug}`,
      lastModified: post.date || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  return [...staticUrls, ...productUrls, ...blogUrls];
}