import connectDB from '@/lib/db';
import ThemeSetting from '@/lib/models/ThemeSetting';
import { cache } from 'react';

export const getThemeSettings = cache(async () => {
  try {
    await connectDB();
    let settings = await ThemeSetting.findOne().lean();
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
    console.error('Error fetching theme settings:', error);
    return null;
  }
});
