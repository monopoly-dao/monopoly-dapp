'use client';

import { AnimatePresence } from 'framer-motion';

import { useAppSelector } from '@/store';

import CryptoAddress from './CryptoAddress';
import PayCrypto from './PayCrypto';
import PayeeDetails from './PayeeDetails';
import PaymentSuccess from './PaymentSuccess';

type Props = {
  isOnHomepage?: boolean;
};
export default function PaymentForm({ isOnHomepage }: Props) {
  const stage = useAppSelector((state) => state.campaignPayment.stage);

  return (
    <div
      className='bg-white rounded-[20px] p-5 lg:p-10 z-[2]'
      style={{
        boxShadow:
          '0px 5.87px 12.47px 0px rgba(0, 0, 0, 0.0275), 0px 27.73px 48.73px 0px rgba(0, 0, 0, 0.0425), 0px 72px 153px 0px rgba(0, 0, 0, 0.07)',
      }}
    >
      <AnimatePresence>
        {stage === 'details' && <PayeeDetails isOnHomepage={isOnHomepage} />}
        {stage === 'crypto' && <PayCrypto />}
        {stage === 'crptoQR' && <CryptoAddress />}
        {stage === 'success' && <PaymentSuccess />}
      </AnimatePresence>
    </div>
  );
}
