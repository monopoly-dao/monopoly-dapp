'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaRegHandshake, FaGlobe, FaChevronRight } from 'react-icons/fa';
import { HiOutlineCash, HiOutlineArrowCircleRight } from 'react-icons/hi';
import { MdOutlineLoop } from 'react-icons/md';

import ExpandableFAQ from '../_components/ExpandableFAQ';
import familyHome from '~/images/landing-banner-2.png';

const homeownerFAQs = [
  {
    question: 'Do I still own and control my home?',
    answer: 'Yes. You remain the legal owner and continue to live in your home. Investors receive a financial interest in a portion of your home\'s value — they have no right to occupy it, visit it, or force a sale.'
  },
  {
    question: 'What if I want to buy back the investor share later?',
    answer: 'You can buy back the investor portion at any point, subject to the terms of your agreement. Most owners retain full flexibility to repurchase as their circumstances change.'
  },
  {
    question: 'Which countries does Settley operate in?',
    answer: 'We currently work with homes in the UK, the US, and Kenya. We\'re actively expanding — join the waitlist to be notified when we open in your country.'
  },
  {
    question: 'How long does the process take?',
    answer: 'Initial review takes 24–48 hours. Once qualified, you\'ll receive a formal offer within 7–14 days after documents are verified.'
  },
  {
    question: 'What are the fees involved?',
    answer: 'We charge a single transparent fee on successful funding. No upfront costs, no appraisal fees, no application fees.'
  },
  {
    question: 'How is this different than a reverse mortgage?',
    answer: 'Reverse mortgages are loans with accumulating interest. Settley is a shared equity arrangement — no monthly payments, no interest, no debt. Investors profit only when you sell or buy them out.'
  },
  {
    question: 'Can I still sell my home later?',
    answer: 'Yes. You can sell your home at any time. The investor receives their proportional share of the sale proceeds, and you keep the rest.'
  }
];

export default function HomeownersPage() {
  const [address, setAddress] = useState('');
  const [checking, setChecking] = useState(false);
  const [checked, setChecked] = useState(false);
  const [qualified, setQualified] = useState(false);

  const handleQuickCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setChecking(true);
    setChecked(false);

    setTimeout(() => {
      setChecking(false);
      setChecked(true);
      // Simple mock qualification logic
      const isSpainOrKenyaOrUSOrUK =
        address.toLowerCase().includes('kenya') ||
        address.toLowerCase().includes('nairobi') ||
        address.toLowerCase().includes('uk') ||
        address.toLowerCase().includes('london') ||
        address.toLowerCase().includes('us') ||
        address.toLowerCase().includes('usa') ||
        address.toLowerCase().includes('york') ||
        address.length > 10;
      setQualified(isSpainOrKenyaOrUSOrUK);
    }, 2000);
  };

  return (
    <div className='min-h-screen text-[#272342] font-inter'>
      {/* 1. Hero Section */}
      <section className='px-[5%] lg:px-[7%] pt-12 pb-20 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
        <div className='lg:col-span-6 flex flex-col gap-6 items-start text-left'>
          <p className='text-xs font-semibold tracking-widest text-[#272342] uppercase bg-[#272342]/5 px-3 py-1.5 rounded-full font-inter'>
            KEEP YOUR HOME. UNLOCK ITS VALUE.
          </p>
          <h1 className='font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#272342]'>
            Unlock Liquidity from Your Home — Without Selling the Whole Thing
          </h1>
          <p className='text-[#3B3C4A] text-lg sm:text-xl leading-relaxed font-light'>
            Sell 10–40% of your home to a global network of investors and keep living in it. No estate agent, no long wait, funds in 7–14 days.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4'>
            <Link
              href='/signup'
              className='bg-[#272342] text-white hover:bg-[#272342]/90 font-medium px-8 py-4 rounded-full text-center flex items-center justify-center gap-2 shadow-md transition-all duration-300'
            >
              Get Started <HiOutlineArrowCircleRight className='text-xl' />
            </Link>
            <button
              // onClick={() => { }}
              className='border border-[#272342] text-[#272342] hover:bg-[#272342]/5 font-medium px-8 py-4 rounded-full text-center transition-all duration-300'
            >
              Talk to an Analyst
            </button>
          </div>

          <p className='text-xs text-[#8E8E93] italic mt-2'>
            *Available for qualifying homes in the UK, US, and Kenya. More markets coming soon.*
          </p>
        </div>

        <div className='lg:col-span-6 w-full h-[320px] sm:h-[450px] relative rounded-3xl overflow-hidden shadow-xl border border-white/50'>
          <Image
            src={familyHome}
            alt='Beautiful modern family home exterior'
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
                Step 1 — Tell Us About Your Home
              </h3>
              <p className='text-[#8E8E93] font-light text-center leading-relaxed max-w-xs'>
                Share basic details in under 5 minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className='flex flex-col items-center gap-4 group p-6 rounded-2xl hover:bg-[#F8F9FF] transition-all duration-300'>
              <div className='w-16 h-16 rounded-full bg-[#272342]/5 flex items-center justify-center text-2xl text-[#272342] group-hover:bg-[#272342] group-hover:text-white transition-all duration-300 font-bold'>
                02
              </div>
              <h3 className='font-playfair font-bold text-xl text-[#272342] mt-2'>
                Step 2 — Get a Valuation and Offer
              </h3>
              <p className='text-[#8E8E93] font-light text-center leading-relaxed max-w-xs'>
                Our analysts review your home and send a transparent offer within 48 hours. Free, with no obligation.
              </p>
            </div>

            {/* Step 3 */}
            <div className='flex flex-col items-center gap-4 group p-6 rounded-2xl hover:bg-[#F8F9FF] transition-all duration-300'>
              <div className='w-16 h-16 rounded-full bg-[#272342]/5 flex items-center justify-center text-2xl text-[#272342] group-hover:bg-[#272342] group-hover:text-white transition-all duration-300 font-bold'>
                03
              </div>
              <h3 className='font-playfair font-bold text-xl text-[#272342] mt-2'>
                Step 3 — List Your Property
              </h3>
              <p className='text-[#8E8E93] font-light text-center leading-relaxed max-w-xs'>
                Once you accept and documents are verified, your property is listed to interested investors. Funds released in 7–14 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Is Settley Right For You */}
      <section className='px-[5%] lg:px-[7%] py-16 md:py-24 max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#272342] font-bold mb-4'>
            Is Settley Right for You?
          </h2>
          <p className='text-[#8E8E93] font-light max-w-xl mx-auto'>
            Most homeowners come to us for one of three reasons:
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Card 1 */}
          <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 items-start'>
            <span className='p-3 bg-[#272342]/5 rounded-2xl text-2xl text-[#272342]'>
              <HiOutlineCash />
            </span>
            <h3 className='font-playfair font-bold text-xl text-[#272342]'>
              Free Up Cash Without Moving
            </h3>
            <p className='text-[#8E8E93] font-light leading-relaxed text-sm lg:text-base'>
              Access equity for a business, medical bill, renovation, or life event — without giving up your home.
            </p>
          </div>

          {/* Card 2 */}
          <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 items-start'>
            <span className='p-3 bg-[#272342]/5 rounded-2xl text-2xl text-[#272342]'>
              <MdOutlineLoop />
            </span>
            <h3 className='font-playfair font-bold text-xl text-[#272342]'>
              Diversify Without Selling
            </h3>
            <p className='text-[#8E8E93] font-light leading-relaxed text-sm lg:text-base'>
              Turn a portion of your home\'s value into liquid capital you can reinvest elsewhere.
            </p>
          </div>

          {/* Card 3 */}
          <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 items-start'>
            <span className='p-3 bg-[#272342]/5 rounded-2xl text-2xl text-[#272342]'>
              <FaRegHandshake />
            </span>
            <h3 className='font-playfair font-bold text-xl text-[#272342]'>
              Help with a Life Transition
            </h3>
            <p className='text-[#8E8E93] font-light leading-relaxed text-sm lg:text-base'>
              Divorce, inheritance, downsizing — we offer a faster, more flexible alternative to a traditional sale.
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
                <HiOutlineCash />
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

      {/* 5. Quick Check Card */}
      <section className='px-[5%] lg:px-[7%] py-16 md:py-24 max-w-4xl mx-auto' id='quick-check'>
        <div className='bg-[#0B1221] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-white/5'>
          {/* Subtle decoration */}
          <div className='absolute -right-16 -top-16 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none' />

          <div className='relative z-10 flex flex-col items-center text-center max-w-xl mx-auto gap-6'>
            <h2 className='font-playfair text-3xl sm:text-4xl font-bold'>
              Quick Check
            </h2>
            <p className='font-light text-white/80 leading-relaxed text-sm sm:text-base'>
              Not sure if your home qualifies? Enter your address for a free instant check. No credit impact and no commitment.
            </p>

            <form onSubmit={handleQuickCheck} className='w-full flex flex-col sm:flex-row gap-3 mt-2'>
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
                Pre-screen Now →
              </button>
            </form>

            {checking && (
              <div className='flex items-center gap-2 mt-1 text-white/60 text-sm'>
                <span className='animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full' />
                Verifying property geographic registry...
              </div>
            )}

            {checked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`font-semibold text-sm mt-1 px-4 py-2 rounded-full ${qualified ? 'text-emerald-400 bg-emerald-400/10' : 'text-amber-400 bg-amber-400/10'
                  }`}
              >
                {qualified
                  ? '✓ Good news! Your home\'s location qualifies for Settley equity release.'
                  : '⚠ Location is currently on waitlist. We have recorded your interest!'}
              </motion.div>
            )}

            <div className='text-xs text-white/50 border-t border-white/10 w-full pt-4 mt-2'>
              *No impact on credit score. This is not an offer of credit.*
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className='px-[5%] lg:px-[7%] pb-20'>
        <ExpandableFAQ items={homeownerFAQs} title='Does Settley right for you? FAQs' />
      </section>

      {/* 7. Still Have Questions contact card */}
      <section className='px-[5%] lg:px-[7%] pb-24 max-w-4xl mx-auto' id='contact'>
        <div className='bg-white border border-[#C6C6CD]/25 rounded-3xl p-8 sm:p-12 text-center shadow-sm flex flex-col items-center gap-6'>
          <h2 className='font-playfair text-3xl sm:text-4xl text-[#272342] font-bold'>
            Still Have Questions?
          </h2>
          <p className='text-[#8E8E93] font-light text-sm sm:text-base max-w-lg'>
            Our team is here to help you understand if Settley is right for your situation.
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
