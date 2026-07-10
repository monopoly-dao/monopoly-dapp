'use client';

import { useState } from 'react';

import BuyTab from './BuyTab';
import BorrowTab from './BorrowTab';
import LendTab from './LendTab';

type Tab = 'buy' | 'borrow' | 'lend';

type Props = {
  propertyId: string;
  propertyName?: string;
  propertySymbol?: string;
  tokensLeft?: string;
  pricePerToken?: number;
};

export default function PropertyActionPanel({
  propertyId,
  propertyName,
  propertySymbol,
  tokensLeft,
  pricePerToken,
}: Props) {
  const [tab, setTab] = useState<Tab>('buy');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'buy', label: 'Buy Tokens' },
    { id: 'borrow', label: 'Borrow' },
    { id: 'lend', label: 'Lend' },
  ];

  return (
    <div className='rounded-[8px] border border-[#D6D3D1] bg-white overflow-hidden'>
      <div className='flex border-b border-[#D6D3D1]'>
        {tabs.map((t) => (
          <button
            key={t.id}
            type='button'
            onClick={() => setTab(t.id)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === t.id
                ? 'bg-navy text-white'
                : 'text-[#57534E] hover:bg-cream'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className='p-6'>
        {tab === 'buy' && (
          <BuyTab
            propertyId={propertyId}
            propertyName={propertyName}
            propertySymbol={propertySymbol}
            tokensLeft={tokensLeft}
            pricePerToken={pricePerToken}
          />
        )}
        {tab === 'borrow' && <BorrowTab propertyId={propertyId} />}
        {tab === 'lend' && <LendTab propertyId={propertyId} />}
      </div>
    </div>
  );
}