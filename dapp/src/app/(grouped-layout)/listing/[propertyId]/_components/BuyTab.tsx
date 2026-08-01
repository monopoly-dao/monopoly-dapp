'use client';

import { useSession } from 'next-auth/react';

import useDisclosure from '@/hooks/useDisclosure';

import Button from '@/components/buttons/Button';

import { useGetWalletStatsQuery } from '@/api/profile';
import authenticatedFuncWrapper from '@/utils/authenticatedFuncWrapper';
import { formatAmount } from '@/utils/utils';

import BuyPropertyModal from '../../_components/BuyPropertyModal';

type Props = {
  propertyId: string;
  propertyName?: string;
  propertySymbol?: string;
  tokensLeft?: string;
  pricePerToken?: number;
};

export default function BuyTab({
  propertyId,
  propertyName,
  propertySymbol,
  tokensLeft,
  pricePerToken = 1,
}: Props) {
  const session = useSession();
  const { isOpen: isBuyOpen, open: openBuy, close: closeBuy } = useDisclosure();

  const userFirebaseId = session.data?.userFirebaseId ?? '';

  const { data: walletStatsResponse } = useGetWalletStatsQuery(userFirebaseId);
  const walletStats = walletStatsResponse?.data;

  return (
    <>
      <div className='flex flex-col gap-3'>
        <p className='text-3xl'>$1/token</p>
        <div className='text-sm'>{formatAmount(tokensLeft)} tokens left.</div>
        <Button
          variant='ghost'
          onClick={() => {
            authenticatedFuncWrapper(openBuy, session.status);
          }}
          className='max-w-[258px] py-4 w-full bg-navy text-white border-navy'
        >
          Buy Property Tokens
        </Button>
      </div>

      <BuyPropertyModal
        isOpen={isBuyOpen}
        handleOpenModal={openBuy}
        handleCloseModal={closeBuy}
        propertyId={propertyId}
        userFirebaseId={session.data?.userFirebaseId ?? ''}
        pricePerToken={pricePerToken}
        propertyName={propertyName}
        propertySymbol={propertySymbol}
        tokensLeft={tokensLeft}
        balance={walletStats?.walletBalance ?? 0}
      />
    </>
  );
}
