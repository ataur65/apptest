import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "./animations.css";
import { Providers } from "./providers"; // Import Providers
import CookieBanner from "@/components/CookieBanner";
import connectDB from '@/lib/db';
import ThemeSetting from '@/lib/models/ThemeSetting';

async function getSettings() {
  try {
    await connectDB();
    let settings = await ThemeSetting.findOne();
    if (!settings) {
      // If no settings exist, create a default one
      settings = await ThemeSetting.create({
        headerLogoUrl: '/img/placeholder.jpg',
        metaTitle: 'My Affiliate App',
        metaDescription: 'A powerful affiliate marketing platform.',
        metaLogoUrl: '/img/placeholder.jpg',
        faviconUrl: '/img/favicon.ico',
        headerSectionText: 'Welcome to our store!',
        showSearchForm: true,
        headerLogoText: 'ffiliate',
        showHeaderLogoImage: true,
        showHeaderLogoText: true,
        showMegaDiscounts: true,
        heroSlides: [], // Initialize heroSlides as an empty array
        clientLogos: [],
        customFields: [],
      });
    }
    return settings;
  } catch (error: any) {
    console.error('Error fetching settings for metadata:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://my-affiliatapp-8.vercel.app'),
    title: settings?.metaTitle || "My Affiliate App",
    description: settings?.metaDescription || "A powerful affiliate marketing platform.",
    icons: {
      icon: settings?.faviconUrl || "/favicon.ico",
    },
    openGraph: {
      images: settings?.metaLogoUrl ? [settings.metaLogoUrl] : [],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers> {/* Use Providers instead of SessionProvider */}
          {children}
        </Providers>
        <CookieBanner />
      </body>
    </html>
  );
}
