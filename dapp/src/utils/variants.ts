import { Variants } from 'framer-motion';

export const multiStepVariants: Variants = {
  initial: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: 'linear',
    },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'linear',
    },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'linear',
    },
  },
};
