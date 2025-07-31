import TwitterCard from './TwittterCard';

export default function Testimonials() {
  return (
    <section className='flex flex-col gap-6 py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'>
      <div className='flex flex-col gap-5'>
        <h2 className='font-medium text-3xl'>Testimonials</h2>
      </div>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        <TwitterCard
          authorName='Emily Roe'
          authorHandle='emilyr'
          content='I never thought owning property could be this easy! With Settley, I bought a share in a stunning villa in minutes—no paperwork, no hassle. Just seamless ownership' // blockchain-powered ownership.'
          timestamp='2h'
          likes={42}
          retweets={12}
          replies={5}
        />
        <TwitterCard
          authorName='James The First'
          authorHandle='jamess'
          content='Settley is the future of real estate! Earn rental income, vote on decisions, and sell your share whenever you want. Finally, a property investment that works on my terms!'
          timestamp='2h'
          likes={42}
          retweets={12}
          replies={5}
        />
        <TwitterCard
          authorName='Sophia M'
          authorHandle='mSophia'
          content='From searching to owning in no time—Settley made buying property effortless. Love the transparency and control it gives me as an investor. Highly recommend!'
          timestamp='2h'
          likes={42}
          retweets={12}
          replies={5}
        />
        <TwitterCard
          authorName='Danny Kenan'
          authorHandle='kenandaniel'
          content={`I've always wanted to invest in real estate but thought it was too complex. Settley changed that. Simple, and secure. A game changer!`} //  and backed by blockchain
          timestamp='2h'
          likes={42}
          retweets={12}
          replies={5}
        />
      </div>
    </section>
  );
}
