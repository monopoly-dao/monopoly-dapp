import Link from 'next/link';

const personaCards = [
  {
    eyebrow: 'I own a property',
    title: 'Raise without selling the whole asset',
    body: 'List your property, set your raise terms, and access capital from buyers and lenders while keeping ownership intact.',
    cta: 'Raise from my property',
    href: 'mailto:hello@settley.co?subject=Raise%20from%20my%20property',
  },
  {
    eyebrow: 'I want to invest',
    title: 'Own a legally structured property share',
    body: 'Browse available properties and secure an ownership stake from a fraction of the full asset value.',
    cta: 'Browse Properties',
    href: '/listings',
  },
  {
    eyebrow: 'I deploy assets',
    title: 'Bring property inventory to ready capital',
    body: 'Bring your property inventory to qualified buyers and lenders with the right structure and ownership records already in place.',
    cta: 'Talk to us',
    href: 'mailto:hello@settley.co?subject=Deploy%20assets%20on%20Settley',
  },
];

export default function PersonaSelector() {
  return (
    <section className='px-[5%] py-12 sm:px-[7%] sm:py-20'>
      <div className='mb-8 max-w-[680px]'>
        <h2 className='text-3xl font-medium sm:text-5xl'>
          What brings you here?
        </h2>
        <p className='mt-4 text-dark-grey'>
          Choose the path that matches what you want to do with property.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
        {personaCards.map((card) => (
          <article
            key={card.eyebrow}
            className='flex min-h-[260px] flex-col justify-between rounded-[8px] border border-[#D6D3D1] bg-white p-6'
          >
            <div>
              <p className='mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-dark-grey'>
                {card.eyebrow}
              </p>
              <h3 className='text-2xl font-medium leading-tight'>
                {card.title}
              </h3>
              <p className='mt-4 text-dark-grey'>{card.body}</p>
            </div>
            <Link href={card.href} className='mt-8 text-sm font-medium underline'>
              {card.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
