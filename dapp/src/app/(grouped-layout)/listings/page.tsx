import ListingCard from './_components/ListingCard';
import ListingsHeader from './_components/ListingsHeader';
import PropertiesFilter from './_components/PropertiesFIlter';

export default function Page() {
  return (
    <div>
      <ListingsHeader />

      <div className='mt-16 mb-16 sm:mb-32 px-[5%]'>
        <div className='flex flex-col lg:flex-row gap-3 justify-between items-start'>
          <h2 className='font-bold text-3xl sm:text-5xl'>Popular Properties</h2>
          <PropertiesFilter />
        </div>
        <div className='my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          <ListingCard />

          <ListingCard />

          <ListingCard />

          <ListingCard />
        </div>
      </div>
    </div>
  );
}
