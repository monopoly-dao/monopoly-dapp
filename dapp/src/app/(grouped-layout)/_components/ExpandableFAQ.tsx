'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import { cn } from '@/lib/utils';

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className='border-b border-[#C6C6CD]/30 last:border-b-0 py-5 transition-colors duration-300'>
      <button
        onClick={onToggle}
        className='flex w-full items-center justify-between text-left gap-4 group'
        aria-expanded={isOpen}
      >
        <span className='font-playfair font-bold text-lg sm:text-xl text-[#272342] group-hover:text-[#272342]/85 transition-colors duration-200'>
          {question}
        </span>
        <span className={cn(
          'text-xl text-[#272342] bg-[#F8F9FF] p-2 rounded-full transition-transform duration-300',
          [isOpen && 'transform rotate-180 bg-navy text-white']
        )}>
          <FiChevronDown />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <p className='font-inter text-sm sm:text-base text-settley-text/90 leading-relaxed font-light mt-3 pr-8'>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type ExpandableFAQProps = {
  items: Array<{ question: string; answer: string }>;
  title?: string;
};

export default function ExpandableFAQ({ items, title = 'Frequently Asked Questions' }: ExpandableFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='py-16 md:py-24 bg-white rounded-3xl border border-[#C6C6CD]/25 shadow-sm max-w-4xl mx-auto px-6 sm:px-10 lg:px-12'>
      <h2 className='font-playfair text-3xl sm:text-4xl text-[#272342] font-bold text-center mb-10 lg:mb-14'>
        {title}
      </h2>
      <div className='flex flex-col'>
        {items.map((item, idx) => (
          <FAQItem
            key={idx}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === idx}
            onToggle={() => handleToggle(idx)}
          />
        ))}
      </div>
    </section>
  );
}
