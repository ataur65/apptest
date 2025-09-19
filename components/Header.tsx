import React from 'react';
import connectDB from '@/lib/db';
import { getThemeSettings } from '@/lib/settings';
import Category from '@/lib/models/Category';
import SocialLink from '@/lib/models/SocialLink';
import MenuItem from '@/lib/models/MenuItem';
import HeaderClient from './HeaderClient';

async function getCategories() {
  try {
    await connectDB();
    const categories = await Category.find({}).lean();
    return categories.map(c => ({...c, _id: c._id.toString()}));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function getSocialLinks() {
  try {
    await connectDB();
    const socialLinks = await SocialLink.find().lean();
    return socialLinks.map(s => ({...s, _id: s._id.toString()}));
  } catch (error) {
    console.error('Error fetching social links:', error);
    return [];
  }
}

async function getMenuItems() {
  try {
    await connectDB();
    const menuItems = await MenuItem.find().lean();
    return menuItems.map(m => ({...m, _id: m._id.toString()}));
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
}

const Header = async () => {
  const settings = await getThemeSettings();
  const categories = await getCategories();
  const socialLinks = await getSocialLinks();
  const menuItems = await getMenuItems();

  return <HeaderClient settings={settings} categories={categories} socialLinks={socialLinks} menuItems={menuItems} />;
};

export default Header;