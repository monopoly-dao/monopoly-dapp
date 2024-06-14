'use client';

import { IoLocationOutline } from 'react-icons/io5';

import Button from '@/components/buttons/Button';
import Dropdown from '@/components/dropdown';
import { InputSearch } from '@/components/input';

const bedOptions = [{ label: 'Any beds', value: 'any' }];

const priceOptions = [{ label: 'Any price', value: 'any' }];

export default function PropertiesSearch() {
  return (
    <div className='flex flex-col items-stretch sm:flex-row w-full gap-y-2 sm:w-4/5'>
      <InputSearch
        containerClassName='col-span-5 w-full sm:w-2/5 sm:col-span-2 rounded-[0px] rounded-r-[26px] sm:rounded-r-[0px] rounded-l-[26px]'
        inputClassName='py-5 rounded-[0px] rounded-r-[26px] sm:rounded-r-[0px] rounded-l-[26px]'
        placeholder='Search locations'
        icon={IoLocationOutline}
      />
      <div className='flex items-stretch justify-center sm:justify-start w-full sm:w-3/5'>
        <Dropdown
          paramKey='beds'
          label='Beds'
          containerClassName='bg-white w-[30%] text-black rounded-l-[26px] sm:rounded-l-[0px]'
          className='rounded-[0px] rounded-l-[26px] sm:rounded-l-[0px]'
          options={bedOptions}
        />
        <Dropdown
          paramKey='Price'
          label='Price'
          containerClassName='bg-white w-[30%] text-black'
          className='rounded-[0px]'
          options={priceOptions}
        />
        <Button className='rounded-[0px] w-[30%] rounded-r-[26px] py-5 px-10 sm:px-14'>
          Search
        </Button>
      </div>
    </div>
  );
}
