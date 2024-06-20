import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Cities from './_components/Cities';
import HowItWorks from './_components/HowItWorks';
import TrendingProperties from './_components/TrendingProperties';
import WhoAreWe from './_components/WhoAreWe';

export const metadata: Metadata = {
  title: 'Join the future of property ownership',
  description:
    'Settley allows you to buy and own a home in minutes enabled by blockchain technology.',
  keywords: [
    'Settley',
    'Join the future of property ownership',
    'SettleyCo',
    'Settley co',
  ],
};

function Dashboard() {
  // const session = useSession();
  // const userId = session.data?.id;

  // const { data } = useGetPropertiesQuery();
  // const { data: wishlistResponse } = useGetWishlistQuery(userId ?? '');

  // const wishlist = wishlistResponse?.data?.wishlist;
  // const wishlistPropertyIds = wishlist?.map((item) => item._id);

  // const properties = data?.data;

  return (
    <div>
      <div className='mt-20 mb-24 flex flex-col gap-11 px-[5%] sm:px-[7%]'>
        <h1 className='font-medium text-[45px] w-full leading-[55px] sm:leading-[75px] lg:leading-[96px] sm:text-[60px] lg:text-[80px]'>
          <div>Join the future of </div>
          <div>property ownership</div>
        </h1>
        <p>
          Settley is redefining property ownership by leveraging decentralized
          finance.
        </p>
      </div>

      <div className='relative'>
        <Image
          src='/images/landing-banner.jpg'
          alt='banner'
          width={1000}
          height={595}
          quality={100}
          className='w-full h-[250px] sm:h-[400px] lg:h-[595px] object-cover'
        />
        <div className='absolute bottom-0 bg-black/50 z-[2] py-8 text-white w-full flex justify-end pr-[10%]'>
          <Link href='/listings' className='flex items-center gap-5'>
            Villa in Lake Como, Italy{' '}
            <Image
              src='/icons/white arrow.png'
              alt='arrow'
              width={33}
              height={1}
            />
          </Link>
        </div>
      </div>

      <HowItWorks />

      <TrendingProperties />

      <div className='bg-cream px-[5%] lg:px-[7%] py-12 sm:py-20 lg:py-28 flex flex-col gap-28'>
        <WhoAreWe />
        <Cities />
      </div>

      {/* <div className='my-20 px-[7%] grid grid-cols-3 gap-4'>
        {properties?.map((property) => (
          <div key={property._id} className='col-span-1'>
            <PropertyCard property={property} wishlist={wishlistPropertyIds} />
          </div>
        ))}
      </div> */}

      {/* <div className='px-[7%]'>
        <SubscriptionForm />
      </div> */}
    </div>
  );
}

export default Dashboard;
