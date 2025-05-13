'use client';

import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import ResetPasswordForm from './_components/ResetPasswordForm';
import ResetSuccess from './_components/ResetSuccess';

export default function Page() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isFormSubmitted && <ResetSuccess />}
        {!isFormSubmitted && (
          <ResetPasswordForm setIsFormSubmitted={setIsFormSubmitted} />
        )}
      </AnimatePresence>
    </>
  );
}
