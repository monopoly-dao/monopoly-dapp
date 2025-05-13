'use client';

import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import SignupForm from './_components/SignupForm';
import SignupSuccess from './_components/SignupSuccess';

export default function Page() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <>
      <AnimatePresence>
        {isFormSubmitted && <SignupSuccess email={email} />}
        {!isFormSubmitted && (
          <SignupForm
            setIsFormSubmitted={setIsFormSubmitted}
            setEmail={setEmail}
          />
        )}
      </AnimatePresence>
    </>
  );
}
