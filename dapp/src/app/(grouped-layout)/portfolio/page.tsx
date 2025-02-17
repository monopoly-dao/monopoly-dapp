import RealEstateCard from './_components/RealEstateCard';
import TransactionItem from './_components/TransactionItem';

export default function Page() {
  return (
    <div className='px-[5%] py-5 flex flex-col gap-20'>
      <h1 className='leading-[50px] text-4xl'>Portfolio Overview</h1>

      <div className='flex flex-col gap-8'>
        <h2 className='text-2xl'>Real Estate</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8'>
          <RealEstateCard /> <RealEstateCard /> <RealEstateCard />{' '}
          <RealEstateCard /> <RealEstateCard /> <RealEstateCard />
        </div>
      </div>

      {/* <div>
        <h2 className='text-xl'>Fractional NFTs</h2>
      </div> */}

      {/* <div>
        <h2 className='text-xl'>Governance Tokens</h2>
      </div> */}

      <div className='flex flex-col gap-10'>
        <h2 className='text-2xl'>Transaction History</h2>
        <div className='w-full lg:w-[600px] flex flex-col gap-8'>
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
        </div>
      </div>
    </div>
  );
}
