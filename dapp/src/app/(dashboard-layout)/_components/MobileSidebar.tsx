'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import Sidebar from './Sidebar'; // Adjust the import path as needed

const sidebarVariants = {
  closed: { x: '-100%' },
  open: { x: 0 },
};

const backdropVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          aria-label='Open menu'
          onClick={() => setOpen(true)}
          className='fixed top-4 left-4 z-[1003] text-2xl bg-transparent border-none cursor-pointer'
        >
          &#9776;
        </button>
      )}

      <div>
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                key='backdrop'
                initial='closed'
                animate='open'
                exit='closed'
                variants={backdropVariants}
                transition={{ duration: 0.3 }}
                className='fixed top-0 left-0 w-screen h-screen bg-black/30 z-[1000]'
                onClick={() => setOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                key='sidebar'
                initial='closed'
                animate='open'
                exit='closed'
                variants={sidebarVariants}
                transition={{ type: 'tween', duration: 0.3 }}
                className='fixed top-0 left-0 h-screen w-[80vw] max-w-[320px] bg-white z-[1001] shadow-lg flex flex-col'
              >
                <button
                  aria-label='Close menu'
                  onClick={() => setOpen(false)}
                  className='absolute top-4 right-4 z-[1002] text-2xl bg-transparent border-none cursor-pointer'
                >
                  &times;
                </button>
                <Sidebar closeSidebar={() => setOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MobileSidebar;
