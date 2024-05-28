export default function HowItWorks() {
  return (
    <div className='flex flex-col gap-6 sm:gap-12'>
      <h2 className='font-bold text-3xl sm:text-5xl'>
        Own a Property in minutes
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-xl font-semibold'>
        <div className='shadow-xl rounded-[10px] py-10 px-5 sm:px-10'>
          Buy property instantly on the blockhain, whole or fractionalized.
        </div>
        <div className='shadow-xl rounded-[10px] py-10 px-5 sm:px-10'>
          Simplify real-world property transactions with automated title
          management.
        </div>
        <div className='shadow-xl rounded-[10px] py-10 px-5 sm:px-10'>
          Our local entity acts as an escrow agent on your behalf when you buy
          fractions of property.
        </div>
      </div>
    </div>
  );
}
