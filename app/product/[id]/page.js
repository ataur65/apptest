import ProductPageTemplate from '@/components/ProductPageTemplate';
import ProductDetailsView from '@/components/ProductDetailsView';
import RelatedProducts from '@/components/RelatedProducts';
import Link from 'next/link';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { getThemeSettings } from '@/lib/settings';

const SITE_URL = 'https://my-affiliatapp-8.vercel.app';

async function getProduct(id) {
  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    if (product) {
        product._id = product._id.toString();
    }
    return product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  return {
    title: product.name,
    description: product.shortDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      images: [{ url: product.image }],
    },
  };
}

async function getRelatedProducts(id) {
  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    if (!product) {
        return [];
    }
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }, // Exclude the current product
    }).limit(5).lean(); // Limit to 5 related products
    return relatedProducts.map(p => ({...p, _id: p._id.toString()}));
  } catch (error) {
    console.error('Failed to fetch related products:', error);
    return [];
  }
}

export default async function ProductDetailsPage({ params }) {
  const { id } = params;
  const product = await getProduct(id);
  const themeSettings = await getThemeSettings();
  const socialLinks = themeSettings?.socialLinks || [];
  if (product && typeof product.shortDescription === 'undefined') {
    product.shortDescription = '';
  }
  const relatedProducts = await getRelatedProducts(id);

  if (!product) {
    return (
      <ProductPageTemplate 
        title="Product Not Found"
        heroImage="/img/bedroom-747525_1920.jpg"
        breadcrumbs={<nav className="text-sm mb-6 text-gray-600"><Link href="/" className="hover:underline">Home</Link> &gt; <Link href="/products" className="hover:underline">Products</Link></nav>}
      >
        <p>We couldn&apos;t find the product you were looking for.</p>
      </ProductPageTemplate>
    );
  }

  const breadcrumbs = (
    <nav className="text-sm mb-6 text-gray-600">
      <Link href="/" className="hover:underline">Home</Link> &gt; <Link href="/products" className="hover:underline">Products</Link> &gt; <span>{product.name}</span>
    </nav>
  );

  const jsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": `${SITE_URL}${product.image}`,
      "description": product.shortDescription || product.description,
      "sku": product._id,
      "brand": {
        "@type": "Brand",
        "name": product.brand
      },
      "offers": {
        "@type": "Offer",
        "url": `${SITE_URL}/product/${product._id}`,
        "priceCurrency": "USD",
        "price": product.price,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
    };

  return (
    <ProductPageTemplate
      title={product.name}
      heroImage="/img/bedroom-747525_1920.jpg"
      breadcrumbs={breadcrumbs}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailsView product={product} socialLinks={socialLinks} />
      <RelatedProducts items={relatedProducts} />
    </ProductPageTemplate>
  );
}