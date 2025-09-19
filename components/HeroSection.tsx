import React from 'react';
import { getThemeSettings } from '@/lib/settings';
import HeroSectionClient from './HeroSectionClient';

const HeroSection = async () => {
  const settings = await getThemeSettings();
  const heroSlides = settings?.heroSlides || [];

  return <HeroSectionClient heroSlides={heroSlides} />;
};

export default HeroSection;
