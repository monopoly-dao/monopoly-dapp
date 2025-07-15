'use client';

import React from 'react';

import LocationDetailsGrid from './_components/LocationDetailsGrid';
import MarketTicker from './_components/MarketTicker';

export default function MarketsPage() {
  // Example data, replace with real data source or API call
  const marketRates = [
    {
      region: 'London',
      country: 'UK',
      price: '£1,200,000',
      change: '+2.5%',
      image: '/images/landing-banner.png',
    },
    {
      region: 'Paris',
      country: 'France',
      price: '€950,000',
      change: '+1.8%',
      image: '/images/france.png',
    },
    {
      region: 'Monaco',
      country: 'Monaco',
      price: '€3,500,000',
      change: '+3.2%',
      image: '/images/Monaco.png',
    },
    {
      region: 'Mykonos',
      country: 'Greece',
      price: '€800,000',
      change: '+1.1%',
      image: '/images/mykonos.png',
    },
    {
      region: 'Baku',
      country: 'Azerbaijan',
      price: '₼600,000',
      change: '+0.9%',
      image: '/images/Azerbaijan.png',
    },
  ];

  // Example comprehensive data for each location
  const locationDetails = [
    {
      region: 'London',
      country: 'UK',
      propertyTypes: [
        {
          type: 'Studio',
          avgPrice: '£650,000',
          change: '+1.2%',
          available: 32,
        },
        {
          type: '1 Bedroom',
          avgPrice: '£850,000',
          change: '+2.1%',
          available: 21,
        },
        { type: 'Loft', avgPrice: '£1,200,000', change: '+2.5%', available: 8 },
        {
          type: 'Penthouse',
          avgPrice: '£2,800,000',
          change: '+3.0%',
          available: 2,
        },
      ],
    },
    {
      region: 'Paris',
      country: 'France',
      propertyTypes: [
        {
          type: 'Studio',
          avgPrice: '€400,000',
          change: '+0.8%',
          available: 18,
        },
        {
          type: '1 Bedroom',
          avgPrice: '€600,000',
          change: '+1.5%',
          available: 14,
        },
        { type: 'Loft', avgPrice: '€950,000', change: '+1.8%', available: 6 },
        {
          type: 'Penthouse',
          avgPrice: '€2,100,000',
          change: '+2.2%',
          available: 1,
        },
      ],
    },
    {
      region: 'Monaco',
      country: 'Monaco',
      propertyTypes: [
        {
          type: 'Studio',
          avgPrice: '€1,200,000',
          change: '+2.0%',
          available: 7,
        },
        {
          type: '1 Bedroom',
          avgPrice: '€2,000,000',
          change: '+2.7%',
          available: 5,
        },
        { type: 'Loft', avgPrice: '€3,500,000', change: '+3.2%', available: 2 },
        {
          type: 'Penthouse',
          avgPrice: '€7,000,000',
          change: '+4.1%',
          available: 1,
        },
      ],
    },
    {
      region: 'Mykonos',
      country: 'Greece',
      propertyTypes: [
        {
          type: 'Studio',
          avgPrice: '€300,000',
          change: '+0.5%',
          available: 12,
        },
        {
          type: '1 Bedroom',
          avgPrice: '€500,000',
          change: '+1.1%',
          available: 9,
        },
        { type: 'Loft', avgPrice: '€800,000', change: '+1.1%', available: 3 },
        {
          type: 'Penthouse',
          avgPrice: '€1,600,000',
          change: '+1.8%',
          available: 1,
        },
      ],
    },
    {
      region: 'Baku',
      country: 'Azerbaijan',
      propertyTypes: [
        {
          type: 'Studio',
          avgPrice: '₼200,000',
          change: '+0.3%',
          available: 20,
        },
        {
          type: '1 Bedroom',
          avgPrice: '₼350,000',
          change: '+0.7%',
          available: 15,
        },
        { type: 'Loft', avgPrice: '₼600,000', change: '+0.9%', available: 4 },
        {
          type: 'Penthouse',
          avgPrice: '₼1,200,000',
          change: '+1.5%',
          available: 1,
        },
      ],
    },
  ];

  return (
    <main className='relative bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f9fafb] px-2 py-6 md:px-10 lg:px-32 font-n-montreal overflow-hidden'>
      {/* Decorative blurred background shapes */}
      <div className='pointer-events-none select-none absolute -z-10 top-0 left-0 w-full h-full'>
        <div className='absolute w-80 h-80 bg-[#c9ff63]/30 rounded-full blur-3xl left-[-6rem] top-[-4rem] animate-float-slow' />
        <div className='absolute w-96 h-96 bg-[#272343]/20 rounded-full blur-3xl right-[-8rem] top-32 animate-float-slower' />
        <div className='absolute w-60 h-60 bg-[#ffd6e0]/30 rounded-full blur-2xl left-1/2 bottom-[-5rem] animate-float' />
      </div>

      {/* Hero Section */}
      <section className='text-center mb-14 flex flex-col items-center justify-center relative z-10'>
        <h1 className='text-4xl md:text-6xl font-extrabold linear-gradient mb-4 drop-shadow-lg animate-fade-in-up'>
          <span className='inline-block font-merriweather text-3xl font-semibold'>
            Global Property Market Rates
          </span>
        </h1>
        <p className='text-lg text-gray-700 max-w-2xl mx-auto animate-fade-in-up delay-150'>
          Explore the latest property market rates across the world's most
          sought-after regions.
          <br className='hidden md:block' />
          <span className='text-[#272343] font-semibold'>Stay ahead</span> with
          real-time trends and make informed investment decisions.
        </p>
      </section>

      {/* Animated Market Ticker */}
      <MarketTicker marketRates={marketRates} />

      {/* Comprehensive Property Insights */}
      <LocationDetailsGrid locations={locationDetails} />

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 32s linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 2, 0.6, 1) both;
        }
        .animate-delay-200 {
          animation-delay: 0.2s !important;
        }
        .animate-delay-400 {
          animation-delay: 0.4s !important;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 12s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float 18s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
