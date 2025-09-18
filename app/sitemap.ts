import { MetadataRoute } from 'next'

const URL = 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    try {
      const productsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?limit=1000`);
      const productsData = await productsRes.json();
      productUrls = productsData.products.map((product: { _id: string; updatedAt?: Date }) => ({
        url: `${URL}/product/${product._id}`,
        lastModified: product.updatedAt || new Date(),
      }));
    } catch (error) {
      console.error("Error fetching products for sitemap:", error);
    }
  }

  // Fetch dynamic blog routes
  let blogUrls: MetadataRoute.Sitemap = [];
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    try {
      const blogsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog?limit=1000`);
      const blogsData = await blogsRes.json();
      blogUrls = blogsData.blogPosts.map((post: { slug: string; date?: Date }) => ({
        url: `${URL}/blog/${post.slug}`,
        lastModified: post.date || new Date(),
      }));
    } catch (error) {
      console.error("Error fetching blogs for sitemap:", error);
    }
  }

  return [...staticUrls, ...productUrls, ...blogUrls];
}
