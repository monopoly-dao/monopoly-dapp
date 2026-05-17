'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaRegHandshake, FaGlobe, FaCheckCircle } from 'react-icons/fa';
import { HiOutlineLightningBolt, HiOutlineArrowCircleRight } from 'react-icons/hi';
import { MdOutlineShield } from 'react-icons/md';

import ExpandableFAQ from '../_components/ExpandableFAQ';
import keysHandover from '~/images/keys-background.jpg';

const sellerFAQs = [
  {
    question: 'How is this different from an estate agent?',
    answer: 'Estate agents market your home locally and wait for a buyer. Settley opens your home to a global network of pre-qualified investors, which typically means faster completion and fewer fall-throughs.'
  },
  {
    question: 'How fast can I complete?',
    answer: 'Most sellers complete in 30–45 days from accepting an offer. Traditional estate agent sales average 3–6 months.'
  },
  {
    question: 'What fees do I pay?',
    answer: 'A single transparent fee on completion, lower than the combined cost of a traditional estate agent plus legal fees. Full breakdown provided with your offer.'
  },
  {
    question: 'Who are the buyers?',
    answer: 'Our investor network includes institutional investors, family offices, and individual buyers from around the world. Every buyer is verified and funded before being matched to a home.'
  },
  {
    question: 'What happens if the sale falls through?',
    answer: 'Our completion rate is significantly higher than the traditional market because buyers are funded and committed before matching. In the rare case a sale falls through, we re-list at no additional cost to you.'
  },
  {
    question: 'Can I set my own price?',
    answer: 'Yes. You provide your target sale price, and we match you with investors who meet your terms. You\'re in control of the final decision.'
  },
  {
    question: 'Do I need to make repairs before selling?',
    answer: 'No. We buy homes as-is. You can avoid the cost and hassle of pre-sale repairs and renovations.'
  },
  {
    question: 'What if my home is already listed with an agent?',
    answer: 'You can still work with Settley. Many sellers use us as a backup option or to accelerate a slow sale. Contact us to discuss your situation.'
  }
];

export default function SellersPage() {
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRequestOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAddress('');
    }, 4000);
  };

  return (
    <div className='min-h-screen text-[#272342] font-inter'>
      {/* 1. Hero Section */}
      <section className='px-[5%] lg:px-[7%] pt-12 pb-20 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
        <div className='lg:col-span-6 flex flex-col gap-6 items-start text-left'>
          <p className='text-xs font-semibold tracking-widest text-[#272342] uppercase bg-[#272342]/5 px-3 py-1.5 rounded-full'>
            GLOBAL BUYERS. FASTER COMPLETION. CLEANER SALE.
          </p>
          <h1 className='font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#272342]'>
            Sell Your Home to a Global Network of Investors
          </h1>
          <p className='text-[#3B3C4A] text-lg sm:text-xl leading-relaxed font-light'>
            Skip the estate agents and the waiting. Settley opens your home to investors around the world who complete faster than traditional buyers.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4'>
            <Link
              href='/signup'
              className='bg-[#272342] text-white hover:bg-[#272342]/90 font-medium px-8 py-4 rounded-full text-center flex items-center justify-center gap-2 shadow-md transition-all duration-300'
            >
              Start Your Sale → <HiOutlineArrowCircleRight className='text-xl' />
            </Link>
            <button
              // onClick={() => { }}
              className='border border-[#272342] text-[#272342] hover:bg-[#272342]/5 font-medium px-8 py-4 rounded-full text-center transition-all duration-300'
            >
              Talk to an Analyst
            </button>
          </div>

          <p className='text-xs text-[#8E8E93] italic mt-2'>
            *Available for qualifying homes in the UK, US, and Kenya.*
          </p>
        </div>

        <div className='lg:col-span-6 w-full h-[320px] sm:h-[450px] relative rounded-3xl overflow-hidden shadow-xl border border-white/50'>
          <Image
            src={keysHandover}
            alt='Modern home keys handing over'
            fill
            priority
            placeholder='blur'
            className='object-cover'
          />
        </div>
      </section>

      {/* 2. How it Works */}
      <section className='bg-white py-16 md:py-24 border-y border-[#C6C6CD]/20'>
        <div className='px-[5%] lg:px-[7%] max-w-7xl mx-auto text-center'>
          <h2 className='font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#272342] font-bold mb-16'>
            How It Works
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'>
            {/* Step 1 */}
            <div className='flex flex-col items-center gap-4 group p-6 rounded-2xl hover:bg-[#F8F9FF] transition-all duration-300'>
              <div className='w-16 h-16 rounded-full bg-[#272342]/5 flex items-center justify-center text-2xl text-[#272342] group-hover:bg-[#272342] group-hover:text-white transition-all duration-300 font-bold'>
                01
              </div>
              <h3 className='font-playfair font-bold text-xl text-[#272342] mt-2'>
                Step 1 — List with Us
              </h3>
              <p className='text-[#8E8E93] font-light text-center leading-relaxed max-w-xs'>
                Share your home\'s details and your target sale price. Takes under 10 minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className='flex flex-col items-center gap-4 group p-6 rounded-2xl hover:bg-[#F8F9FF] transition-all duration-300'>
              <div className='w-16 h-16 rounded-full bg-[#272342]/5 flex items-center justify-center text-2xl text-[#272342] group-hover:bg-[#272342] group-hover:text-white transition-all duration-300 font-bold'>
                02
              </div>
              <h3 className='font-playfair font-bold text-xl text-[#272342] mt-2'>
                Step 2 — We Match You with Investors
              </h3>
              <p className='text-[#8E8E93] font-light text-center leading-relaxed max-w-xs'>
                Your home is opened to our global investor network. Most qualifying homes receive firm interest within 14 days.
              </p>
            </div>

            {/* Step 3 */}
            <div className='flex flex-col items-center gap-4 group p-6 rounded-2xl hover:bg-[#F8F9FF] transition-all duration-300'>
              <div className='w-16 h-16 rounded-full bg-[#272342]/5 flex items-center justify-center text-2xl text-[#272342] group-hover:bg-[#272342] group-hover:text-white transition-all duration-300 font-bold'>
                03
              </div>
              <h3 className='font-playfair font-bold text-xl text-[#272342] mt-2'>
                Step 3 — Complete the Sale
              </h3>
              <p className='text-[#8E8E93] font-light text-center leading-relaxed max-w-xs'>
                Once terms are agreed, completion typically happens in 30–45 days — significantly faster than a traditional chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Sellers Choose Settley */}
      <section className='px-[5%] lg:px-[7%] py-16 md:py-24 max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#272342] font-bold mb-4'>
            Why Sellers Choose Settley
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Card 1 */}
          <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 items-start'>
            <span className='p-3 bg-[#272342]/5 rounded-2xl text-2xl text-[#272342]'>
              <MdOutlineShield />
            </span>
            <h3 className='font-playfair font-bold text-lg text-[#272342]'>
              No Chain, No Fall-Throughs
            </h3>
            <p className='text-[#8E8E93] font-light leading-relaxed text-sm'>
              Investors commit with funds ready. No waiting on someone else\'s sale.
            </p>
          </div>

          {/* Card 2 */}
          <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 items-start'>
            <span className='p-3 bg-[#272342]/5 rounded-2xl text-2xl text-[#272342]'>
              <FaGlobe />
            </span>
            <h3 className='font-playfair font-bold text-lg text-[#272342]'>
              Global Buyer Pool
            </h3>
            <p className='text-[#8E8E93] font-light leading-relaxed text-sm'>
              Reach buyers beyond your local market — including diaspora buyers looking for specific locations.
            </p>
          </div>

          {/* Card 3 */}
          <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 items-start'>
            <span className='p-3 bg-[#272342]/5 rounded-2xl text-2xl text-[#272342]'>
              <HiOutlineLightningBolt />
            </span>
            <h3 className='font-playfair font-bold text-lg text-[#272342]'>
              Faster Than a Traditional Agent
            </h3>
            <p className='text-[#8E8E93] font-light leading-relaxed text-sm'>
              Average completion in 30–45 days, compared to 3–6 months for traditional sales.
            </p>
          </div>

          {/* Card 4 */}
          <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 items-start'>
            <span className='p-3 bg-[#272342]/5 rounded-2xl text-2xl text-[#272342]'>
              <FaCheckCircle />
            </span>
            <h3 className='font-playfair font-bold text-lg text-[#272342]'>
              Transparent Fees
            </h3>
            <p className='text-[#8E8E93] font-light leading-relaxed text-sm'>
              One clear fee on completion. No estate agent percentage, no drawn-out negotiation.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Does Your Home Qualify? */}
      <section className='bg-white py-16 md:py-24 border-t border-[#C6C6CD]/20'>
        <div className='px-[5%] lg:px-[7%] max-w-5xl mx-auto'>
          <h2 className='font-playfair text-3xl sm:text-4xl text-[#272342] font-bold text-center mb-4'>
            Does Your Home Qualify?
          </h2>
          <p className='text-[#8E8E93] text-center font-light mb-16 max-w-xl mx-auto'>
            We work with well-maintained homes in strong locations. Here\'s what we look for:
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center text-center'>
            <div className='flex flex-col items-center gap-3 max-w-xs'>
              <span className='p-4 bg-[#F8F9FF] rounded-full text-2xl text-[#272342] border border-[#272342]/10'>
                <FaHome />
              </span>
              <h3 className='font-playfair font-bold text-lg text-[#272342]'>
                Property Types
              </h3>
              <p className='text-[#8E8E93] font-light text-xs sm:text-sm leading-relaxed'>
                Houses, flats, apartments, and small multi-unit buildings (up to 4 units).
              </p>
            </div>

            <div className='flex flex-col items-center gap-3 max-w-xs'>
              <span className='p-4 bg-[#F8F9FF] rounded-full text-2xl text-[#272342] border border-[#272342]/10'>
                <FaRegHandshake />
              </span>
              <h3 className='font-playfair font-bold text-lg text-[#272342]'>
                Occupancy
              </h3>
              <p className='text-[#8E8E93] font-light text-xs sm:text-sm leading-relaxed'>
                Owner-occupied, vacant, or let to long-term tenants.
              </p>
            </div>

            <div className='flex flex-col items-center gap-3 max-w-xs'>
              <span className='p-4 bg-[#F8F9FF] rounded-full text-2xl text-[#272342] border border-[#272342]/10'>
                <FaGlobe />
              </span>
              <h3 className='font-playfair font-bold text-lg text-[#272342]'>
                Location
              </h3>
              <p className='text-[#8E8E93] font-light text-xs sm:text-sm leading-relaxed'>
                Global — UK, US, Kenya (expanding soon)
              </p>
            </div>

            <div className='flex flex-col items-center gap-3 max-w-xs'>
              <span className='p-4 bg-[#F8F9FF] rounded-full text-2xl text-[#272342] border border-[#272342]/10'>
                <HiOutlineLightningBolt />
              </span>
              <h3 className='font-playfair font-bold text-lg text-[#272342]'>
                Value
              </h3>
              <p className='text-[#8E8E93] font-light text-xs sm:text-sm leading-relaxed'>
                Typically £150,000+ / $200,000+ / KSh 10M+
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quick Start Offer Card */}
      <section className='px-[5%] lg:px-[7%] py-16 md:py-24 max-w-4xl mx-auto' id='quick-start'>
        <div className='bg-[#0B1221] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-white/5'>
          {/* Subtle decoration */}
          <div className='absolute -left-16 -bottom-16 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none' />

          <div className='relative z-10 flex flex-col items-center text-center max-w-xl mx-auto gap-6'>
            <h2 className='font-playfair text-3xl sm:text-4xl font-bold'>
              Get an Indicative Offer
            </h2>
            <p className='font-light text-white/80 leading-relaxed text-sm sm:text-base'>
              Tell us about your home and get an indicative price range from our analysts within 48 hours. Free and no commitment.
            </p>

            <form onSubmit={handleRequestOffer} className='w-full flex flex-col sm:flex-row gap-3 mt-2'>
              <input
                type='text'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Enter your property address...'
                className='flex-1 h-[52px] px-6 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm'
              />
              <button
                type='submit'
                className='h-[52px] px-8 bg-white text-[#0B1221] hover:bg-white/90 font-semibold rounded-full text-sm transition-all duration-300 whitespace-nowrap'
              >
                Request Offer →
              </button>
            </form>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-emerald-400 font-medium text-sm mt-1'
              >
                ✓ Request submitted! Our valuation analysts will review your details.
              </motion.div>
            )}

            <div className='text-xs text-white/50 border-t border-white/10 w-full pt-4 mt-2'>
              *Indicative offer only. Final terms subject to valuation and documentation.*
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className='px-[5%] lg:px-[7%] pb-20'>
        <ExpandableFAQ items={sellerFAQs} title='Seller FAQs' />
      </section>

      {/* 7. Still Have Questions contact card */}
      <section className='px-[5%] lg:px-[7%] pb-24 max-w-4xl mx-auto' id='contact'>
        <div className='bg-white border border-[#C6C6CD]/25 rounded-3xl p-8 sm:p-12 text-center shadow-sm flex flex-col items-center gap-6'>
          <h2 className='font-playfair text-3xl sm:text-4xl text-[#272342] font-bold'>
            Still Have Questions?
          </h2>
          <p className='text-[#8E8E93] font-light text-sm sm:text-base max-w-lg'>
            Our team is here to help you understand the best path for your sale.
          </p>
          <Link
            href='mailto:temisan@settley.co'
            className='bg-[#272342] text-white hover:bg-[#272342]/90 font-medium px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-md transition-all duration-300'
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </div>
  );
}
