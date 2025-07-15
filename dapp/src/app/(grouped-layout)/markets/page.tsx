'use client';

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import { InputSearch } from '@/components/input';

import { Badge } from './_components/Badge';
import { Card, CardContent } from './_components/Card';

export default function SettleyPropertyPage() {
  const [viewMode, setViewMode] = useState<'tile' | 'carousel'>('tile');
  const [currentSlide, setCurrentSlide] = useState(0);

  const properties = [
    {
      id: 1,
      country: 'GB',
      city: 'London',
      fullCountry: 'United Kingdom',
      price: '£950,000',
      priceChange: '+2.5%',
      priceType: 'Studio to 3BR',
      description:
        'Studios from £450K, 1BR £650K, 2BR £950K, 3BR townhouses £1.8M+. Premium properties in one of...',
      pricePerSqm: '£12,000',
      listings: '2,341',
      features: ['Global Financial Hub', 'Historic Properties'],
      image: '/images/france.png',
      gradient: 'from-blue-900/80 to-slate-800/80',
    },
    {
      id: 2,
      country: 'AE',
      city: 'Dubai',
      fullCountry: 'UAE',
      price: '680,000د.إ',
      priceChange: '+8.7%',
      priceType: 'Studio to 3BR',
      description:
        'Studios from 320د.إ-K, 1BR 480د.إ-K, 2BR 680د.إ-K, 3BR 1.2د.إ-M+. Ultra-modern properties in the Middle Eas...',
      pricePerSqm: '8,500د.إ',
      listings: '1,876',
      features: ['Tax-Free', 'Modern Infrastructure'],
      image: '/images/Azerbaijan.png',
      gradient: 'from-orange-900/80 to-amber-800/80',
    },
    {
      id: 3,
      country: 'SG',
      city: 'Singapore',
      fullCountry: 'Singapore',
      price: 'S$1.2M',
      priceChange: '+4.3%',
      priceType: '1BR to 3BR',
      description:
        "1BR condos from S$800K, 2BR S$1.2M, 3BR S$1.8M+. Premium condominiums in Asia's leading...",
      pricePerSqm: 'S$15,000',
      listings: '1,234',
      features: ['Financial Hub', 'Stable Government'],
      image: '/images/JM_Mishref_House.png',
      gradient: 'from-emerald-900/80 to-teal-800/80',
    },
    {
      id: 4,
      country: 'MC',
      city: 'Monaco',
      fullCountry: 'Monaco',
      price: '€2.8M',
      priceChange: '+3.2%',
      priceType: 'Studio to 3BR',
      description:
        "Studios from €850K, 1BR €1.2M, 2BR €2.1M, 3BR €4.5M+. Ultra-luxury properties in the world's most...",
      pricePerSqm: '€47,000',
      listings: '234',
      features: ['Tax Haven', 'Luxury Lifestyle'],
      image: '/images/Monaco.png',
      gradient: 'from-purple-900/80 to-indigo-800/80',
    },
    {
      id: 5,
      country: 'GR',
      city: 'Mykonos',
      fullCountry: 'Greece',
      price: '€650,000',
      priceChange: '+1.1%',
      priceType: '1BR to Villa',
      description:
        '1BR apartments from €280K, 2BR €450K, 3BR houses €750K, luxury villas €1.5M+. Stunning islan...',
      pricePerSqm: '€4,200',
      listings: '456',
      features: ['Historic Charm', 'Golden Visa'],
      image: '/images/Montenegro.png',
      gradient: 'from-blue-800/80 to-cyan-700/80',
    },
    {
      id: 6,
      country: 'AZ',
      city: 'Baku',
      fullCountry: 'Azerbaijan',
      price: '₼420,000',
      priceChange: '+0.9%',
      priceType: 'Studio to 3BR',
      description:
        'Studios from ₼180K, 1BR ₼280K, 2BR ₼420K, 3BR ₼680K. Modern properties in the rapidly developing...',
      pricePerSqm: '₼2,800',
      listings: '789',
      features: ['Emerging Market', 'Oil Economy'],
      image: '/images/mykonos.png',
      gradient: 'from-gray-900/80 to-slate-800/8',
    },
  ];

  const carouselProperties = [
    {
      country: 'PT',
      city: 'Lisbon',
      fullCountry: 'Portugal',
      price: '€380,000',
      priceChange: '+6.1%',
      priceType: 'Average Studio to 3BR',
      description:
        "Studios from €180K, 1BR €280K, 2BR €380K, 3BR €550K+. Historic and modern properties in Portugal's vibrant capital.",
      pricePerSqm: '€4,800',
      marketCap: '€45B',
      activeListings: '1,200',
      avgDaysOnMarket: '70',
      features: [
        'Historic Charm',
        'Golden Visa',
        'Coastal Location',
        'Growing Tech Scene',
      ],
      popularAreas: 'Chiado, Príncipe Real, Alfama',
      image: '/images/mykonos.png',
      gradient: 'from-orange-900/60 to-red-800/60',
    },
    {
      country: 'TH',
      city: 'Bangkok',
      fullCountry: 'Thailand',
      price: '฿8.2M',
      priceChange: '+3.8%',
      priceType: 'Average Studio to 3BR',
      description:
        "Studios from ฿3.5M, 1BR ฿5.2M, 2BR ฿8.2M, 3BR ฿12M+. Modern condominiums in Southeast Asia's...",
      pricePerSqm: '฿3,200',
      marketCap: '฿2.1T',
      activeListings: '4,500',
      avgDaysOnMarket: '45',
      features: [
        'Affordable Luxury',
        'Expat Friendly',
        'Modern Amenities',
        'Investment Potential',
      ],
      popularAreas: 'Sukhumvit, Silom, Sathorn',
      image: '/images/interior1.png',
      gradient: 'from-gray-800/60 to-slate-700/60',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselProperties.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + carouselProperties.length) % carouselProperties.length
    );
  };

  return (
    <div className='min-h-screen bg-gray-50 px-2 py-6 md:px-10 lg:px-32 font-n-montreal'>
      {/* Hero Section */}
      <section className='bg-white py-16'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
            Discover Global
            <br />
            Property Prices
          </h1>
          <p className='text-xl text-gray-600 mb-4 max-w-3xl mx-auto'>
            Explore real property costs across the world's most sought-after
            markets. From luxury villas in Monaco to modern apartments in Tokyo.
          </p>
          <p className='text-lg text-gray-700 font-medium mb-8'>
            Real Prices. Real Markets. Real Data.
          </p>
          <Button className='bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg mb-12'>
            Explore Markets
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>

          {/* Search Bar */}
          <div className='max-w-2xl mx-auto relative mb-8'>
            <div className='relative'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <InputSearch
                placeholder='Search by city, country, or region...'
                className='pl-12 pr-16 py-4 text-lg border-2 border-gray-200 rounded-full'
                containerClassName='rounded-full'
              />
              <Button
                // size='icon'
                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900 hover:bg-gray-800 rounded-full'
              >
                <Filter className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* View Toggle */}
          <div className='flex justify-center mb-8'>
            <div className='bg-gray-100 rounded-full p-1 flex'>
              <Button
                variant={viewMode === 'carousel' ? 'primary' : 'ghost'}
                className={`rounded-full px-6 ${
                  viewMode === 'carousel'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setViewMode('carousel')}
              >
                Carousel View
              </Button>
              <Button
                variant={viewMode === 'tile' ? 'primary' : 'ghost'}
                className={`rounded-full px-6 ${
                  viewMode === 'tile'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setViewMode('tile')}
              >
                Tile View
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Cards */}
      <section className='py-8'>
        <div className='container mx-auto px-4'>
          {viewMode === 'tile' ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
              {properties.map((property) => (
                <Card
                  key={property.id}
                  className='overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow'
                >
                  <div className='relative h-64'>
                    <Image
                      src={property.image || '/placeholder.svg'}
                      alt={`${property.city}, ${property.fullCountry}`}
                      fill
                      className='object-cover'
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${property.gradient}`}
                    />
                    <div className='absolute top-4 left-4'>
                      <div className='bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white font-medium'>
                        A+
                      </div>
                    </div>
                    <div className='absolute bottom-4 left-4 text-white'>
                      <div className='text-sm font-medium'>
                        {property.country}
                      </div>
                      <div className='text-2xl font-bold'>{property.city}</div>
                      <div className='text-sm opacity-90'>
                        {property.fullCountry}
                      </div>
                    </div>
                  </div>
                  <CardContent className='p-6'>
                    <div className='flex items-center justify-between mb-2'>
                      <div className='text-2xl font-bold text-gray-900'>
                        {property.price}
                      </div>
                      <div className='flex items-center text-green-600'>
                        <TrendingUp className='h-4 w-4 mr-1' />
                        <span className='font-medium'>
                          {property.priceChange}
                        </span>
                        <span className='text-xs text-gray-500 ml-1'>YoY</span>
                      </div>
                    </div>
                    <div className='text-sm text-gray-600 mb-3'>
                      {property.priceType}
                    </div>
                    <p className='text-sm text-gray-700 mb-4 line-clamp-2'>
                      {property.description}
                    </p>

                    <div className='grid grid-cols-2 gap-4 mb-4 text-sm'>
                      <div>
                        <span className='text-gray-500'>Per m²</span>
                        <div className='font-bold'>{property.pricePerSqm}</div>
                      </div>
                      <div>
                        <span className='text-gray-500'>Listings</span>
                        <div className='font-bold'>{property.listings}</div>
                      </div>
                    </div>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      {property.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant='secondary'
                          className='text-xs bg-blue-50 text-blue-700'
                        >
                          {feature}
                        </Badge>
                      ))}
                      <Badge
                        variant='secondary'
                        className='text-xs bg-gray-100 text-gray-600'
                      >
                        +2
                      </Badge>
                    </div>

                    <Button className='w-full bg-gray-900 hover:bg-gray-800 text-white'>
                      Explore Properties
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className='mb-12'>
              <div className='relative'>
                <div className='flex overflow-hidden'>
                  <div
                    className='flex transition-transform duration-300 ease-in-out'
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {carouselProperties.map((property, index) => (
                      <div key={index} className='w-full flex-shrink-0'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto'>
                          <div className='relative h-96 lg:h-[500px] rounded-lg overflow-hidden'>
                            <Image
                              src={property.image || '/placeholder.svg'}
                              alt={`${property.city}, ${property.fullCountry}`}
                              fill
                              className='object-cover'
                            />
                            <div
                              className={`absolute inset-0 bg-gradient-to-t ${property.gradient}`}
                            />
                            <div className='absolute bottom-6 left-6 text-white'>
                              <div className='text-lg font-medium'>
                                {property.country}
                              </div>
                              <div className='text-4xl font-bold'>
                                {property.city}
                              </div>
                              <div className='text-lg opacity-90'>
                                {property.fullCountry}
                              </div>
                            </div>
                          </div>

                          <div className='flex flex-col justify-center p-6'>
                            <div className='flex items-center justify-between mb-4'>
                              <div className='text-4xl font-bold text-gray-900'>
                                {property.price}
                              </div>
                              <div className='flex items-center text-green-600'>
                                <TrendingUp className='h-5 w-5 mr-1' />
                                <span className='font-medium text-lg'>
                                  {property.priceChange}
                                </span>
                                <span className='text-sm text-gray-500 ml-1'>
                                  YoY Change
                                </span>
                              </div>
                            </div>

                            <div className='text-gray-600 mb-4'>
                              {property.priceType}
                            </div>
                            <p className='text-gray-700 mb-6'>
                              {property.description}
                            </p>

                            <div className='grid grid-cols-2 gap-6 mb-6'>
                              <div>
                                <span className='text-gray-500 text-sm'>
                                  Price per m²
                                </span>
                                <div className='font-bold text-xl'>
                                  {property.pricePerSqm}
                                </div>
                              </div>
                              <div>
                                <span className='text-gray-500 text-sm'>
                                  Market Cap
                                </span>
                                <div className='font-bold text-xl'>
                                  {property.marketCap}
                                </div>
                              </div>
                              <div>
                                <span className='text-gray-500 text-sm'>
                                  Active Listings
                                </span>
                                <div className='font-bold text-xl'>
                                  {property.activeListings}
                                </div>
                              </div>
                              <div>
                                <span className='text-gray-500 text-sm'>
                                  Avg. Days on Market
                                </span>
                                <div className='font-bold text-xl'>
                                  {property.avgDaysOnMarket}
                                </div>
                              </div>
                            </div>

                            <div className='mb-6'>
                              <h4 className='font-semibold mb-3'>
                                Key Features
                              </h4>
                              <div className='flex flex-wrap gap-2'>
                                {property.features.map(
                                  (feature, featureIndex) => (
                                    <Badge
                                      key={featureIndex}
                                      variant='secondary'
                                      className='bg-blue-50 text-blue-700'
                                    >
                                      {feature}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>

                            <div className='mb-6'>
                              <h4 className='font-semibold mb-2'>
                                Popular Areas
                              </h4>
                              <p className='text-gray-600'>
                                {property.popularAreas}
                              </p>
                            </div>

                            <Button className='bg-gray-900 hover:bg-gray-800 text-white w-full py-3'>
                              Explore {property.city} Properties
                              <ArrowRight className='ml-2 h-4 w-4' />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant='outline'
                  //   size='icon'
                  className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm'
                  onClick={prevSlide}
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  //   size='icon'
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm'
                  onClick={nextSlide}
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>

              <div className='flex justify-center mt-6 space-x-2'>
                {carouselProperties.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentSlide ? 'bg-gray-900' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bottom Carousel */}
          <div className='bg-white rounded-lg p-6 mb-8 w-full max-w-[1280px]'>
            <div className='flex items-center justify-between mb-4 w-full'>
              <div className='flex space-x-8 w-full no-scrollbar overflow-x-auto'>
                {properties.slice(0, 5).map((property, index) => (
                  <div
                    key={index}
                    className='text-center w-64 border shadow-sm flex-shrink-0 rounded-lg'
                  >
                    <div className='text-sm text-gray-500 mb-1'>
                      {property.country}
                    </div>
                    <div className='font-semibold text-gray-900'>
                      {property.city}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {property.fullCountry}
                    </div>
                    <div className='font-bold text-lg mt-2'>
                      {property.price}
                    </div>
                    <div className='flex items-center justify-center text-green-600 text-sm'>
                      <TrendingUp className='h-3 w-3 mr-1' />
                      {property.priceChange}
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className='flex space-x-2'>
                <Button variant='outline'>
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button variant='outline'>
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div> */}
            </div>
            {/* <div className='w-full bg-gray-200 rounded-full h-1'>
              <div
                className='bg-gray-400 h-1 rounded-full'
                style={{ width: '20%' }}
              ></div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
