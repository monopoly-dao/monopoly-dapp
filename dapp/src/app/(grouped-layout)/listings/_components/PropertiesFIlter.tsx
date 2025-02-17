'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

const filters = ['View all'];

export default function PropertiesFilter() {
  const [activeTab, setActiveTab] = useState('View all');

  function changeTab(tab: string) {
    setActiveTab(tab);
  }

  return (
    <div className='flex flex-wrap'>
      {filters.map((filter) => (
        <div
          key={filter}
          onClick={() => changeTab(filter)}
          className={cn(
            'py-2 px-[18px] text-black border border-transparent rounded-[6px] cursor-pointer',
            [activeTab === filter && 'border-black font-bold']
          )}
        >
          {filter}
        </div>
      ))}
    </div>
  );
}
