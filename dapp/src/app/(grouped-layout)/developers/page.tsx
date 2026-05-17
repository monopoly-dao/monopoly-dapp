'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaGlobe, FaSearchLocation, FaRegHandshake, FaArrowRight } from 'react-icons/fa';
import { HiOutlineLightBulb, HiOutlineArrowCircleRight } from 'react-icons/hi';

import ExpandableFAQ from '../_components/ExpandableFAQ';
import commercialBldg from '~/images/apartment buildings.jpg';

const developerFAQs = [
  {
    question: 'What types of projects do you fund?',
    answer: 'We focus on residential and mixed-use developments with clear exit strategies. Typical projects are £5M+ in value with 10+ units.'
  },
  {
    question: 'How fast can I close?',
    answer: 'Once terms are agreed, initial closings can happen in 30–45 days. Full project sales may close in tranches over 60–90 days.'
  },
  {
    question: 'Do you fund construction or only completed units?',
    answer: 'Both. We can structure off-plan sales (pre-completion) or bulk purchases of completed inventory. Construction financing is available for qualified developers.'
  },
  {
    question: 'What\'s your fee structure?',
    answer: 'Developer fees vary by project structure. Typically 3–6% on successful capital raise, plus legal and compliance costs. Full breakdown provided in term sheet.'
  },
  {
    question: 'Can you sell units fractionally?',
    answer: 'Yes. We can tokenize individual units or the entire project, allowing multiple investors to participate. This often accelerates sales velocity.'
  },
  {
    question: 'What information do you need to evaluate my project?',
    answer: 'We need: (1) Project summary and business plan, (2) Financial pro forma and sources/uses, (3) Timeline and current status, (4) Location and market analysis, (5) Team background and track record, and (6) Existing capital structure.'
  },
  {
    question: 'Do you work with developers outside the UK, US, and Kenya?',
    answer: 'We\'re focused on these core markets but evaluate opportunities in select emerging markets. Contact us to discuss your project location.'
  },
  {
    question: 'Can you help with bridge financing?',
    answer: 'Yes. We can structure bridge facilities to complete construction or carry projects through to stabilization. Terms vary by project risk profile.'
  }
];

export default function DevelopersPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleRequestProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className='min-h-screen text-[#272342] font-inter'>
      {/* 1. Hero Section */}
      <section className='px-[5%] lg:px-[7%] pt-12 pb-20 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
        <div className='lg:col-span-6 flex flex-col gap-6 items-start text-left'>
          <p className='text-xs font-semibold tracking-widest text-[#272342] uppercase bg-[#272342]/5 px-3 py-1.5 rounded-full font-inter'>
            GLOBAL REACH. FASTER SALES. CERTAIN COMPLETION.
          </p>
          <h1 className='font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#272342]'>
            Move Inventory Faster. Reach Investors Globally.
          </h1>
          <p className='text-[#3B3C4A] text-lg sm:text-xl leading-relaxed font-light'>
            Settley helps developers sell units off-plan or post-completion to a global network of pre-qualified investors.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4'>
            <a
              href='#contact-proposal'
              className='bg-[#272342] text-white hover:bg-[#272342]/90 font-medium px-8 py-4 rounded-full text-center flex items-center justify-center gap-2 shadow-md transition-all duration-300'
            >
              Partner With Us → <HiOutlineArrowCircleRight className='text-xl' />
            </a>
            <a
              href='#case-studies'
              className='border border-[#272342] text-[#272342] hover:bg-[#272342]/5 font-medium px-8 py-4 rounded-full text-center transition-all duration-300'
            >
              View Case Studies
            </a>
          </div>

          <p className='text-xs text-[#8E8E93] italic mt-2'>
            *Working with developers in the UK, US, Kenya, and emerging markets.*
          </p>
        </div>

        <div className='lg:col-span-6 w-full h-[320px] sm:h-[450px] relative rounded-3xl overflow-hidden shadow-xl border border-white/50'>
          <Image
            src={commercialBldg}
            alt='Modern high-rise commercial architecture exterior'
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
                Step 1 — Share Your Project
              </h3>
              <p className='text-[#8E8E93] font-light text-center leading-relaxed max-w-xs'>
                Tell us about your development — unit mix, pricing, timeline, and sales targets.
              </p>
            </div>

            {/* Step 2 */}
            <div className='flex flex-col items-center gap-4 group p-6 rounded-2xl hover:bg-[#F8F9FF] transition-all duration-300'>
              <div className='w-16 h-16 rounded-full bg-[#272342]/5 flex items-center justify-center text-2xl text-[#272342] group-hover:bg-[#272342] group-hover:text-white transition-all duration-300 font-bold'>
                02
              </div>
              <h3 className='font-playfair font-bold text-xl text-[#272342] mt-2'>
                Step 2 — We Structure the Offering
              </h3>
              <p className='text-[#8E8E93] font-light text-center leading-relaxed max-w-xs'>
                Our team structures your project for tokenized or fractional sale, handling legal and compliance.
              </p>
            </div>

            {/* Step 3 */}
            <div className='flex flex-col items-center gap-4 group p-6 rounded-2xl hover:bg-[#F8F9FF] transition-all duration-300'>
              <div className='w-16 h-16 rounded-full bg-[#272342]/5 flex items-center justify-center text-2xl text-[#272342] group-hover:bg-[#272342] group-hover:text-white transition-all duration-300 font-bold'>
                03
              </div>
              <h3 className='font-playfair font-bold text-xl text-[#272342] mt-2'>
                Step 3 — Access Global Capital
              </h3>
              <p className='text-[#8E8E93] font-light text-center leading-relaxed max-w-xs'>
                Your units are marketed to our institutional and high-net-worth investor network. Sales complete in 30–60 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Developers Choose Settley */}
      <section className='px-[5%] lg:px-[7%] py-16 md:py-24 max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#272342] font-bold mb-4'>
            Why Developers Choose Settley
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Card 1 */}
          <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 items-start'>
            <span className='p-3 bg-[#272342]/5 rounded-2xl text-2xl text-[#272342]'>
              <FaBuilding />
            </span>
            <h3 className='font-playfair font-bold text-xl text-[#272342]'>
              Sell Off-Plan with Certainty
            </h3>
            <p className='text-[#8E8E93] font-light leading-relaxed text-sm lg:text-base'>
              Lock in sales before construction completes. No more waiting for individual buyers to secure mortgages.
            </p>
          </div>

          {/* Card 2 */}
          <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 items-start'>
            <span className='p-3 bg-[#272342]/5 rounded-2xl text-2xl text-[#272342]'>
              <HiOutlineLightBulb />
            </span>
            <h3 className='font-playfair font-bold text-xl text-[#272342]'>
              Bulk Sales, Not Unit-by-Unit
            </h3>
            <p className='text-[#8E8E93] font-light leading-relaxed text-sm lg:text-base'>
              Sell multiple units in a single transaction or coordinated series. Move inventory faster than traditional retail sales.
            </p>
          </div>

          {/* Card 3 */}
          <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 items-start'>
            <span className='p-3 bg-[#272342]/5 rounded-2xl text-2xl text-[#272342]'>
              <FaGlobe />
            </span>
            <h3 className='font-playfair font-bold text-xl text-[#272342]'>
              Global Investor Access
            </h3>
            <p className='text-[#8E8E93] font-light leading-relaxed text-sm lg:text-base'>
              Reach diaspora buyers, family offices, and institutional investors who can\'t access local listings.
            </p>
          </div>

          {/* Card 4 */}
          <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 items-start'>
            <span className='p-3 bg-[#272342]/5 rounded-2xl text-2xl text-[#272342]'>
              <FaRegHandshake />
            </span>
            <h3 className='font-playfair font-bold text-xl text-[#272342]'>
              Flexible Structures
            </h3>
            <p className='text-[#8E8E93] font-light leading-relaxed text-sm lg:text-base'>
              Sell whole units, fractional interests, or income-sharing arrangements. We structure deals that match your capital needs.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Who We Work With */}
      <section className='bg-white py-16 md:py-24 border-t border-[#C6C6CD]/20'>
        <div className='px-[5%] lg:px-[7%] max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#272342] font-bold mb-4'>
              Who We Work With
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-[#F8F9FF] p-8 rounded-3xl border border-[#C6C6CD]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3'>
              <h3 className='font-playfair font-bold text-lg text-[#272342]'>
                Residential Developers
              </h3>
              <p className='text-[#8E8E93] font-light text-sm leading-relaxed'>
                Single-family homes, apartments, condominiums, and mixed-use projects.
              </p>
            </div>

            <div className='bg-[#F8F9FF] p-8 rounded-3xl border border-[#C6C6CD]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3'>
              <h3 className='font-playfair font-bold text-lg text-[#272342]'>
                Commercial Developers
              </h3>
              <p className='text-[#8E8E93] font-light text-sm leading-relaxed'>
                Office, retail, industrial, and hospitality projects with residential components.
              </p>
            </div>

            <div className='bg-[#F8F9FF] p-8 rounded-3xl border border-[#C6C6CD]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3'>
              <h3 className='font-playfair font-bold text-lg text-[#272342]'>
                Distressed Asset Owners
              </h3>
              <p className='text-[#8E8E93] font-light text-sm leading-relaxed'>
                Developments stuck in construction or post-completion with unsold inventory.
              </p>
            </div>

            <div className='bg-[#F8F9FF] p-8 rounded-3xl border border-[#C6C6CD]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3'>
              <h3 className='font-playfair font-bold text-lg text-[#272342]'>
                Land Owners
              </h3>
              <p className='text-[#8E8E93] font-light text-sm leading-relaxed'>
                Serving as equity partners on developments in exchange for land contributions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Typical Deal Profile */}
      <section className='bg-white py-16 md:py-20 border-t border-[#C6C6CD]/20'>
        <div className='px-[5%] lg:px-[7%] max-w-5xl mx-auto'>
          <h2 className='font-playfair text-3xl sm:text-4xl text-[#272342] font-bold text-center mb-16'>
            Typical Deal Profile
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center text-center'>
            <div className='flex flex-col items-center gap-3 max-w-xs'>
              <span className='p-4 bg-[#F8F9FF] rounded-full text-2xl text-[#272342] border border-[#272342]/10'>
                <FaBuilding />
              </span>
              <h3 className='font-playfair font-bold text-lg text-[#272342]'>
                Project Size
              </h3>
              <p className='text-[#8E8E93] font-light text-xs sm:text-sm leading-relaxed'>
                £5M+ / $10M+ total development value
              </p>
            </div>

            <div className='flex flex-col items-center gap-3 max-w-xs'>
              <span className='p-4 bg-[#F8F9FF] rounded-full text-2xl text-[#272342] border border-[#272342]/10'>
                <FaRegHandshake />
              </span>
              <h3 className='font-playfair font-bold text-lg text-[#272342]'>
                Unit Count
              </h3>
              <p className='text-[#8E8E93] font-light text-xs sm:text-sm leading-relaxed'>
                10+ units (or single large commercial asset)
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
                Primary & secondary markets in UK, US, Kenya, & select emerging markets
              </p>
            </div>

            <div className='flex flex-col items-center gap-3 max-w-xs'>
              <span className='p-4 bg-[#F8F9FF] rounded-full text-2xl text-[#272342] border border-[#272342]/10'>
                <FaSearchLocation />
              </span>
              <h3 className='font-playfair font-bold text-lg text-[#272342]'>
                Stage
              </h3>
              <p className='text-[#8E8E93] font-light text-xs sm:text-sm leading-relaxed'>
                Pre-construction, under construction, or post-completion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Get a Proposal Card */}
      <section className='px-[5%] lg:px-[7%] py-16 md:py-24 max-w-4xl mx-auto' id='contact-proposal'>
        <div className='bg-[#0B1221] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-white/5'>
          {/* Subtle decoration */}
          <div className='absolute -right-20 -bottom-20 w-56 h-56 bg-white/5 rounded-full blur-3xl pointer-events-none' />

          <div className='relative z-10 flex flex-col items-center text-center max-w-xl mx-auto gap-6'>
            <h2 className='font-playfair text-3xl sm:text-4xl font-bold'>
              Get a Proposal
            </h2>
            <p className='font-light text-white/80 leading-relaxed text-sm sm:text-base'>
              Tell us about your project and receive a term sheet within 5 business days. Our team will review your project details and propose a structure that matches your capital timeline.
            </p>

            <form onSubmit={handleRequestProposal} className='w-full flex flex-col gap-4 mt-2 items-stretch'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <input
                  type='text'
                  required
                  placeholder='Your Name'
                  className='h-[52px] px-6 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm'
                />
                <input
                  type='email'
                  required
                  placeholder='Work Email'
                  className='h-[52px] px-6 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm'
                />
              </div>
              <input
                type='text'
                required
                placeholder='Project Name & Location'
                className='h-[52px] px-6 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm'
              />
              <button
                type='submit'
                className='h-[52px] px-8 bg-white text-[#0B1221] hover:bg-white/90 font-semibold rounded-full text-sm transition-all duration-300 whitespace-nowrap self-center inline-flex items-center gap-2'
              >
                Request Proposal →
              </button>
            </form>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-emerald-400 font-medium text-sm mt-1'
              >
                ✓ Project details received! Our development finance team will review it.
              </motion.div>
            )}

            <div className='text-xs text-white/50 border-t border-white/10 w-full pt-4 mt-2'>
              *Confidential review. No obligation.*
            </div>
          </div>
        </div>
      </section>

      {/* 7. Case Studies section */}
      <section className='bg-white py-16 md:py-24 border-y border-[#C6C6CD]/20' id='case-studies'>
        <div className='px-[5%] lg:px-[7%] max-w-4xl mx-auto text-center flex flex-col items-center gap-6'>
          <h2 className='font-playfair text-3xl sm:text-4xl text-[#272342] font-bold'>
            Case Studies
          </h2>
          <p className='text-[#8E8E93] font-light text-sm sm:text-base italic max-w-lg'>
            *Coming soon — featuring residential developments in Manchester, Lagos, and Austin.*
          </p>
          <a
            href='#contact'
            className='border border-[#272342] text-[#272342] hover:bg-[#272342]/5 font-medium px-8 py-3.5 rounded-full inline-flex items-center gap-2 transition-all duration-300'
          >
            Get Notified When Published →
          </a>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className='px-[5%] lg:px-[7%] py-20 bg-white'>
        <ExpandableFAQ items={developerFAQs} title='Developer FAQs' />
      </section>

      {/* 9. Still Have Questions contact card */}
      <section className='px-[5%] lg:px-[7%] pb-24 max-w-4xl mx-auto' id='contact'>
        <div className='bg-[#0B1221] text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl flex flex-col items-center gap-6 border border-white/5'>
          <h2 className='font-playfair text-3xl sm:text-4xl font-bold text-white'>
            Still Have Questions?
          </h2>
          <p className='text-white/80 font-light text-sm sm:text-base max-w-lg'>
            Our development finance team can evaluate your project and propose a structure that works.
          </p>
          <Link
            href='mailto:temisan@settley.co'
            className='bg-white text-[#0B1221] hover:bg-white/90 font-medium px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-md transition-all duration-300'
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </div>
  );
}
