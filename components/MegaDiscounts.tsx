import React from 'react';
import Link from 'next/link';
import { getThemeSettings } from '@/lib/settings';
import connectDB from '@/lib/db';
import MegaDiscount from '@/lib/models/MegaDiscount';

async function getMegaDiscounts() {
    try {
        await connectDB();
        const megaDiscounts = await MegaDiscount.find().lean();
        return megaDiscounts.map(d => ({...d, _id: d._id.toString()}));
    } catch (error) {
        console.error('Error fetching mega discounts:', error);
        return [];
    }
}

const MegaDiscounts = async () => {
    const settings = await getThemeSettings();
    const megaDiscounts = await getMegaDiscounts();

    if (!settings?.showMegaDiscounts) {
        return null;
    }

    return (
        <section className="bg-gray-100 py-12 border-t-2 border-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Mega Discount</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {megaDiscounts.map((discount) => (
                        <div key={discount._id} className="relative rounded-lg overflow-hidden shadow-lg h-80 group">
                            <img src={discount.image || '/img/placeholder.jpg'} alt={discount.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
                            <div className="relative h-full flex flex-col justify-end p-6 text-white">
                                <p className="text-lg font-medium mb-1">{discount.subtitle}</p>
                                <h3 className="text-3xl font-extrabold leading-tight mb-4">{discount.title}</h3>
                                <Link href={discount.buttonLink} className="bg-orange-500 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-orange-600 transition-colors self-start">
                                    {discount.buttonText}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MegaDiscounts;
