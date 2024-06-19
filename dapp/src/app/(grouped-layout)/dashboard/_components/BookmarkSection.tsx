import Link from 'next/link';

import ListingCard from '../../listings/_components/ListingCard';

const listings = [
  {
    name: 'Palm Jumeirah',
    image: '/images/mansion.jpg',
    location: 'Dubai, UAE',
    beds: 5,
    baths: 10,
    unitsLeft: 50,
    pricePerUnit: 2,
    symbol: 'PAJM',
  },
  {
    name: 'Glass Key',
    image: '/images/apartment buildings.jpg',
    location: 'Florida, USA',
    beds: 3,
    baths: 2,
    unitsLeft: 500,
    pricePerUnit: 20,
    symbol: 'GLKY',
  },
  {
    name: 'Bayview Retreat',
    image: '/images/school dorm.jpg',
    location: 'Zabljak, Montenegro',
    beds: 6,
    baths: 4,
    unitsLeft: 10,
    pricePerUnit: 5,
    symbol: 'bayr',
  },
];

export default function BookmarkSection() {
  return (
    <div>
      <div className='flex justify-between items-start'>
        <h2 className='text-3xl font-inter'>Bookmarks</h2>
        <Link
          href='/dashboard/bookmarks'
          className='text-black flex font-medium items-center gap-2 underline'
        >
          View All
          {/* <IoIosArrowForward /> */}
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        {listings.map((listing, id) => (
          <ListingCard key={id} {...listing} />
        ))}
      </div>
    </div>
  );
}
