import TrendingPropertyCard from '../../_components/TrendingPropertyCard';

export default function YouMightAlsoLike() {
  return (
    <div className='flex flex-col gap-6 sm:gap-12 bg-white py-12 sm:py-20 lg:py-28'>
      <div className='flex justify-between items-start'>
        <h2 className='font-medium text-3xl sm:text-4xl'>
          You Might Also Like
        </h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
        <TrendingPropertyCard
          image='/images/mykonos.png'
          caption='Greece, Mykonos'
        />
        <TrendingPropertyCard
          image='/images/mykonos-2.png'
          caption='Monaco, France'
        />
        <TrendingPropertyCard
          image='/images/france.png'
          caption='Madrid, Spain'
        />
      </div>
    </div>
  );
}
