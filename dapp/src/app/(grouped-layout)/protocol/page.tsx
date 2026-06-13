import { FileText, GitBranch } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Settley Whitepaper',
  description:
    'Conditional liquidity infrastructure for illiquid real-world assets.',
};

const whitepaperHref =
  '/papers/settley-conditional-liquidity-infrastructure.pdf';
const architectureHref =
  'https://github.com/monopoly-dao/monopoly-dapp/blob/codex/scf-stellar-architecture/docs/settley-stellar-technical-architecture.md';

const mechanisms = [
  {
    title: 'Dynamic pricing',
    copy: 'Illiquidity is explicitly priced through NAV staleness penalties and acquisition discounts.',
  },
  {
    title: 'Ownership-backed credit',
    copy: 'Token holders can borrow against their position with conservative, protocol-enforced LTV haircuts.',
  },
  {
    title: 'Bounded failure states',
    copy: 'Circuit breakers and legally defined wind-down procedures limit liquidity death spirals.',
  },
];

const statusItems = [
  'Phase 1 live: tokenized property purchases and onchain deed recording on Base.',
  'Phase 2 in progress: settlement and recovery layer, starting with a Kenya diaspora real estate proof-of-concept.',
];

export default function ProtocolPage() {
  return (
    <div className='bg-white'>
      <section className='px-[5%] lg:px-[7%] py-20 sm:py-28 lg:py-36 border-b border-[#D6D3D1]'>
        <div className='max-w-5xl'>
          <p className='text-sm uppercase tracking-[0.18em] text-[#57534E] mb-6'>
            Protocol paper
          </p>
          <h1 className='font-medium text-[46px] sm:text-[72px] lg:text-[92px] leading-[1.02] text-[#1C1917]'>
            The Settley Whitepaper
          </h1>
          <p className='mt-8 text-2xl sm:text-3xl max-w-4xl text-[#272343]'>
            Conditional liquidity infrastructure for illiquid real-world assets.
          </p>
          <p className='mt-10 text-lg sm:text-xl max-w-4xl text-[#44403C]'>
            Tokenization solved issuance. Settley solves the liquidity
            bottleneck.
          </p>
          <p className='mt-5 text-lg sm:text-xl max-w-4xl text-[#44403C]'>
            We propose a noncustodial, compliance-gated protocol for
            ownership-backed credit, dynamic NAV discounting, and legally
            enforceable recovery mechanisms.
          </p>
          <div className='mt-10 flex flex-col sm:flex-row gap-4'>
            <Link
              href={whitepaperHref}
              target='_blank'
              className='bg-navy text-white rounded-[6px] py-4 px-6 w-fit font-medium flex items-center gap-3'
            >
              <FileText size={18} />
              Read the Whitepaper
            </Link>
            <Link
              href={architectureHref}
              target='_blank'
              className='border border-navy text-navy rounded-[6px] py-4 px-6 w-fit font-medium flex items-center gap-3'
            >
              <GitBranch size={18} />
              View Protocol Architecture
            </Link>
          </div>
        </div>
      </section>

      <section className='px-[5%] lg:px-[7%] py-16 sm:py-24 bg-cream'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20'>
          <div>
            <p className='text-sm uppercase tracking-[0.18em] text-[#57534E] mb-4'>
              The bottleneck
            </p>
            <h2 className='text-3xl sm:text-5xl font-medium text-[#1C1917]'>
              Issuance is not liquidity.
            </h2>
          </div>
          <p className='text-lg text-[#44403C] leading-relaxed'>
            Most real-world asset projects focus on cryptographic issuance. But
            a tokenized claim over an illiquid asset remains illiquid if there
            is no credible balance sheet willing to price its risk, provide exit
            liquidity, or enforce recovery.
          </p>
        </div>
      </section>

      <section className='px-[5%] lg:px-[7%] py-16 sm:py-24'>
        <div className='max-w-3xl mb-12'>
          <p className='text-sm uppercase tracking-[0.18em] text-[#57534E] mb-4'>
            The Settley mechanism
          </p>
          <h2 className='text-3xl sm:text-5xl font-medium text-[#1C1917]'>
            Asset-specific credit, not pretend liquidity.
          </h2>
          <p className='mt-6 text-lg text-[#44403C]'>
            Instead of pretending illiquid assets can trade like public
            equities, Settley introduces the Asset-Specific Vault: a
            programmable credit facility attached to individual illiquid assets.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {mechanisms.map((item) => (
            <div
              key={item.title}
              className='border border-[#D6D3D1] rounded-[8px] p-6 bg-white min-h-[220px]'
            >
              <h3 className='text-xl font-medium text-[#1C1917]'>
                {item.title}
              </h3>
              <p className='mt-5 text-[#44403C]'>{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='px-[5%] lg:px-[7%] py-16 sm:py-24 bg-cream'>
        <div className='max-w-4xl'>
          <p className='text-sm uppercase tracking-[0.18em] text-[#57534E] mb-4'>
            Current status
          </p>
          <h2 className='text-3xl sm:text-5xl font-medium text-[#1C1917]'>
            Built from the property wedge toward real-asset infrastructure.
          </h2>
          <div className='mt-8 grid grid-cols-1 gap-4'>
            {statusItems.map((item, index) => (
              <div
                key={item}
                className='border border-[#D6D3D1] bg-white rounded-[8px] p-5 flex gap-4 items-start'
              >
                <span className='h-8 w-8 shrink-0 rounded-full bg-navy text-white flex items-center justify-center text-sm font-medium'>
                  {index + 1}
                </span>
                <p className='text-[#1C1917] font-medium leading-relaxed'>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
