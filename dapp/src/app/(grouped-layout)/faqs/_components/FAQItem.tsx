'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';

import { cn } from '@/lib/utils';
import useOnClickOutside from '@/hooks/useOnClickOutside';

import IconButton from '@/components/buttons/IconButton';

const questionAnimationVariant = {
  initial: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
  animate: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
};

type Props = {
  question: string;
  answer: string;
  index: number;
};

export default function FAQItem({ question, answer, index }: Props) {
  const [isQuestionOpen, setIsQuestionOpen] = useState(() =>
    index === 0 ? true : false
  );

  const ref = useRef(null);

  useOnClickOutside(ref, closeQuestion);

  const Icon = isQuestionOpen ? RxCaretUp : RxCaretDown;

  function toggleQuestion() {
    setIsQuestionOpen(!isQuestionOpen);
  }

  function closeQuestion() {
    setIsQuestionOpen(false);
  }

  return (
    <div
      onClick={toggleQuestion}
      className={cn(
        'border-text-grey/30 text-text-grey/30 flex w-full cursor-pointer items-start justify-between gap-3 border-b px-4 py-4 md:px-14 md:py-6',
        [isQuestionOpen && 'border-dark text-text-primary']
      )}
      ref={ref}
    >
      <div className='flex w-3/4 flex-col items-start gap-3 text-start'>
        <p className='text-xl font-bold md:text-2xl font-roboto'>{question}</p>

        <AnimatePresence>
          {isQuestionOpen && (
            <motion.div
              variants={questionAnimationVariant}
              initial='initial'
              exit='exit'
              animate='animate'
              key='profile-dropdown'
            >
              <p className='font-general-sans'>{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <IconButton
        variant='ghost'
        icon={Icon}
        className={cn('text-text-grey/30 text-2xl', [
          isQuestionOpen && 'text-text-primary',
        ])}
      />
    </div>
  );
}
