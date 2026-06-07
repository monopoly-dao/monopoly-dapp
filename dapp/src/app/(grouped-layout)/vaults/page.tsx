import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Settley Vaults Work',
  description:
    'See how Settley helps owners raise from property, buyers buy property tokens, and lenders fund property-backed loans.',
};

const overviewCards = [
  {
    title: 'Owners raise from property',
    copy: 'An owner can bring eligible property to Settley, create property tokens, and request capital without selling the whole asset.',
  },
  {
    title: 'Buyers buy tokens',
    copy: 'A buyer reviews the property and buys tokens tied to that opportunity, instead of trying to buy the entire property alone.',
  },
  {
    title: 'Lenders fund loans',
    copy: 'A lender can fund a property-backed loan after reviewing the collateral, rate, repayment date, and documents.',
  },
];

const vaultSteps = [
  {
    title: 'Property comes in',
    copy: 'The owner or deployer submits the property, documents, ownership records, and basic terms.',
  },
  {
    title: 'Tokens are created',
    copy: 'The property is represented by tokens so ownership and collateral can be tracked clearly.',
  },
  {
    title: 'A vault sits beside it',
    copy: 'The vault is where a loan request can live. It holds the terms lenders need to review before funding.',
  },
  {
    title: 'Capital chooses a path',
    copy: 'Buyers can buy property tokens. Lenders can fund a loan backed by pledged property tokens.',
  },
  {
    title: 'Repayment or recovery is tracked',
    copy: 'If the borrower repays, the loan closes. If not, the pledged tokens follow the agreed collateral process.',
  },
];

const lenderChecks = [
  'What property backs the loan',
  'How many tokens are pledged as collateral',
  'The requested loan amount',
  'The rate and repayment date',
  'The documents and recovery process',
];

export default function VaultsPage() {
  return (
    <div className='bg-white'>
      <section className='px-[5%] lg:px-[7%] py-20 sm:py-28 lg:py-36 border-b border-[#D6D3D1]'>
        <div className='max-w-5xl'>
          <p className='text-sm uppercase tracking-[0.18em] text-[#57534E] mb-6'>
            How Settley works
          </p>
          <h1 className='font-medium text-[46px] sm:text-[72px] lg:text-[92px] leading-[1.02] text-[#1C1917]'>
            One property. Tokens, buyers, lenders, and a vault.
          </h1>
          <p className='mt-8 text-lg sm:text-2xl max-w-4xl text-[#44403C]'>
            Settley starts with a real property. The property can be turned into
            tokens, buyers can buy those tokens, and lenders can fund loans
            backed by the tokens as collateral.
          </p>
          <div className='mt-10 flex flex-col sm:flex-row gap-4'>
            <Link
              href='/listings'
              className='bg-navy text-white rounded-[6px] py-4 px-6 w-fit font-medium'
            >
              Browse Properties
            </Link>
            <Link
              href='#owners'
              className='border border-navy text-navy rounded-[6px] py-4 px-6 w-fit font-medium'
            >
              Raise from a Property
            </Link>
          </div>
        </div>
      </section>

      <section className='px-[5%] lg:px-[7%] py-16 sm:py-24 bg-cream'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {overviewCards.map((card) => (
            <div
              key={card.title}
              className='border border-[#D6D3D1] rounded-[8px] p-6 bg-white min-h-[220px]'
            >
              <h2 className='text-2xl font-medium text-[#1C1917]'>
                {card.title}
              </h2>
              <p className='mt-5 text-[#44403C]'>{card.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id='how-vaults-work'
        className='px-[5%] lg:px-[7%] py-16 sm:py-24'
      >
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20'>
          <div>
            <p className='text-sm uppercase tracking-[0.18em] text-[#57534E] mb-4'>
              The vault
            </p>
            <h2 className='text-3xl sm:text-5xl font-medium text-[#1C1917]'>
              A vault is the loan layer for a specific property.
            </h2>
            <p className='mt-6 text-lg text-[#44403C]'>
              It does not replace the property. It sits beside the property
              token structure and defines the loan terms: how much is being
              raised, what collateral is pledged, what rate is offered, and when
              repayment is due.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            {vaultSteps.map((step, index) => (
              <div
                key={step.title}
                className='border border-[#D6D3D1] rounded-[8px] p-5 bg-white flex gap-4'
              >
                <span className='h-8 w-8 shrink-0 rounded-full bg-navy text-white flex items-center justify-center text-sm font-medium'>
                  {index + 1}
                </span>
                <div>
                  <h3 className='font-medium text-[#1C1917]'>{step.title}</h3>
                  <p className='mt-2 text-[#44403C]'>{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id='owners'
        className='px-[5%] lg:px-[7%] py-16 sm:py-24 bg-cream'
      >
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start'>
          <div>
            <p className='text-sm uppercase tracking-[0.18em] text-[#57534E] mb-4'>
              For owners
            </p>
            <h2 className='text-3xl sm:text-5xl font-medium text-[#1C1917]'>
              Raise without selling the whole property.
            </h2>
          </div>
          <div className='text-lg text-[#44403C] leading-relaxed'>
            <p>
              An owner can tokenize an eligible property and choose how to
              access capital. They may sell tokens to buyers, request a loan
              backed by pledged tokens, or use both paths depending on the
              opportunity.
            </p>
            <p className='mt-5'>
              The important point is control: the owner can set configurable
              terms instead of being forced into a full sale on day one.
            </p>
          </div>
        </div>
      </section>

      <section id='lenders' className='px-[5%] lg:px-[7%] py-16 sm:py-24'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start'>
          <div>
            <p className='text-sm uppercase tracking-[0.18em] text-[#57534E] mb-4'>
              For lenders
            </p>
            <h2 className='text-3xl sm:text-5xl font-medium text-[#1C1917]'>
              Fund a loan when the collateral and terms make sense.
            </h2>
            <p className='mt-6 text-lg text-[#44403C]'>
              Lenders are not just clicking into a random listing. They need to
              understand what backs the loan and what happens after funding.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-3'>
            {lenderChecks.map((check) => (
              <div
                key={check}
                className='border border-[#D6D3D1] rounded-[8px] bg-white p-5 text-[#1C1917] font-medium'
              >
                {check}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='px-[5%] lg:px-[7%] py-16 sm:py-24 bg-cream'>
        <div className='max-w-4xl'>
          <p className='text-sm uppercase tracking-[0.18em] text-[#57534E] mb-4'>
            How this connects to opportunities
          </p>
          <h2 className='text-3xl sm:text-5xl font-medium text-[#1C1917]'>
            Listings are where you review the available property opportunities.
          </h2>
          <p className='mt-6 text-lg text-[#44403C]'>
            Some opportunities may be for buying property tokens. Others may
            support lending against property collateral. The listing is the
            place to review the property, documents, tokens available, and the
            path being offered.
          </p>
          <Link
            href='/listings'
            className='mt-10 inline-flex bg-navy text-white rounded-[6px] py-4 px-6 w-fit font-medium'
          >
            Browse Available Properties
          </Link>
        </div>
      </section>
    </div>
  );
}
