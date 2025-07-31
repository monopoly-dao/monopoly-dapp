import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    avatar: '/images/test-1.png',
    name: 'Emily Roe',
    content:
      'I never thought owning property could be this easy! With Settley, I bought a share in a stunning villa in minutes—no paperwork, no hassle. Just seamless ownership.', // blockchain-powered ownership.',
  },
  {
    avatar: '/images/test-2.png',
    name: 'Jessica Chastain',
    content:
      'From searching to owning in no time—Settley made buying property effortless. Love the transparency and control it gives me as an investor. Highly recommend!',
  },
  {
    avatar: '/images/test-3.png',
    name: 'Billy Joel',
    content:
      'Settley is the future of real estate! Earn rental income, vote on decisions, and sell your share whenever you want. Finally, a property investment that works on my terms!',
  },
];

export default function Testimonials() {
  return (
    <div className='py-20 bg-[#FDF9FF] px-[5%] md:px-[7%] lg:px-[5%]'>
      <div className='flex pb-8 flex-col items-center justify-center gap-[10px] mx-auto w-[90%] md:w-2/3 lg:w-1/2 xl:w-2/5 text-center'>
        <p className='font-roboto font-medium text-3xl text-[#0D0D0D] lg:text-4xl'>
          Our Testimonials
        </p>
        <p className='font-merriweather font-light text-[#0D0D0D]'>
          Our satisfied clients share their success stories and experiences on
          their journey to better health and well-being.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12'>
        {testimonials.map((test) => (
          <TestimonialCard key={test.content} {...test} />
        ))}
      </div>
    </div>
  );
}
