import ListingCard from './_components/ListingCard';
import PropertiesFilter from './_components/PropertiesFIlter';
import ListingHeader from '../listing/_components/ListingHeader';

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
    image: '/assets/Beachfront property.svg',
    location: 'Zabljak, Montenegro',
    beds: 2,
    baths: 1,
    unitsLeft: 10,
    pricePerUnit: 2,
    symbol: 'mnml',
  },
  {
    name: 'Pearl Beach Resort',
    image: '/images/Monaco.png',
    location: 'Dubai, UAE',
    beds: 5,
    baths: 10,
    unitsLeft: 500,
    pricePerUnit: 9,
    symbol: 'prlb',
  },
  {
    name: 'Golden Sands Villa',
    image: '/assets/auction houses.svg',
    location: 'Lisbon, Portugal',
    beds: 3,
    baths: 4,
    unitsLeft: 100,
    pricePerUnit: 2,
    symbol: 'gldv',
  },
  {
    name: 'Dubai Desert Oasis Villa',
    image: '/assets/Featured image.svg',
    location: 'Dubai, UAE',
    beds: 5,
    baths: 10,
    unitsLeft: 50,
    pricePerUnit: 2,
    symbol: 'dbdv',
  },
  {
    name: 'Oasis Tower Residence',
    image: '/images/apartment buildings.jpg',
    location: 'Dubai, UAE',
    beds: 5,
    baths: 10,
    unitsLeft: 50,
    pricePerUnit: 2,
    symbol: 'ostr',
  },
  {
    name: 'Azure Bay Apartments',
    image: '/images/school dorm.jpg',
    location: 'Kotor, Montenegro',
    beds: 3,
    baths: 3,
    unitsLeft: 9,
    pricePerUnit: 6,
    symbol: 'azba',
  },
  {
    name: 'Sunset Retreat',
    image: '/assets/Beachfront property.svg',
    location: 'Algarve, Portugal',
    beds: 10,
    baths: 10,
    unitsLeft: 3,
    pricePerUnit: 50,
    symbol: 'snsr',
  },
];

export default function Page() {
  return (
    <div>
      <ListingHeader />

      <div className='mt-16 mb-16 sm:mb-32 px-[5%]'>
        <div className='flex flex-col lg:flex-row gap-3 justify-between items-start'>
          <h2 className='font-bold text-3xl sm:text-5xl'>Popular Properties</h2>
          <PropertiesFilter />
        </div>
        <div className='my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {listings.map((listing, id) => (
            <ListingCard key={id} {...listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
