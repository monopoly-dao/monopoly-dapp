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
  {
    name: 'Lisbon Loft Apartments',
    image: '/images/Monaco.png',
    location: 'Lisbon, Portgal',
    beds: 5,
    baths: 10,
    unitsLeft: 50,
    pricePerUnit: 2,
    symbol: 'lila',
  },
  {
    name: 'Vineyard Haven Villa',
    image: '/images/header image.jpg',
    location: 'Douro Valley, Portugal',
    beds: 5,
    baths: 10,
    unitsLeft: 50,
    pricePerUnit: 2,
    symbol: 'vnhy',
  },
  {
    name: 'Montenegro Mountain Lodge',
    image: '/svg/Beachfront property.svg',
    location: 'Zabljak, Montenegro',
    beds: 2,
    baths: 1,
    unitsLeft: 10,
    pricePerUnit: 2,
    symbol: 'mnml',
  },
];

export default function Page() {
  return (
    <div>
      <h2 className='text-3xl mt-12 font-inter mb-6'>Bookmarks</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        {listings.map((listing, id) => (
          <ListingCard key={id} {...listing} />
        ))}
      </div>
    </div>
  );
}
