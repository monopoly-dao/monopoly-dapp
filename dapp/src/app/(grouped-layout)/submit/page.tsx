'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { object, string, number } from 'yup';
import Link from 'next/link';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';
import { useCreateSubmissionMutation } from '@/api/vaults';
import { SubmissionType } from '@/api/vaults/vaultsApiTypes';

type Step = 1 | 2 | 3;

const submissionTypes: { value: SubmissionType; label: string; description: string }[] = [
  { value: 'EQUITY_SALE', label: 'Sell equity tokens', description: 'Raise capital by selling ownership tokens' },
  { value: 'FULL_SALE', label: 'Sell outright', description: 'List the property for full sale to token buyers' },
  { value: 'DEVELOPMENT', label: 'Development project', description: 'Tokenize a new build or major renovation' },
  { value: 'DEBT_VAULT', label: 'Borrow against it', description: 'Request a property-backed loan (debt vault)' },
];

export default function SubmitPropertyPage() {
  const [step, setStep] = useState<Step>(1);
  const [createSubmission, { isLoading, isSuccess, data: submissionData }] = useCreateSubmissionMutation();

  const formik = useFormik({
    initialValues: {
      // Step 1
      submissionType: '' as SubmissionType,

      // Step 2
      streetAddress: '',
      city: '',
      stateOrProvince: '',
      country: '',
      postcode: '',
      propertyType: '',
      yearBuilt: '',

      // Step 3
      targetFundingAmount: '',
      equityPercent: '',
      minInvestment: '',
      maxInvestment: '',
      askingPrice: '',
      currentValue: '',
      borrowAmount: '',
      interestRate: '',
      termMonths: '',
    },
    onSubmit: async (values) => {
      const payload: {
        type: SubmissionType;
        streetAddress: string;
        city: string;
        stateOrProvince: string;
        country: string;
        postcode: string;
        propertyType: string;
        yearBuilt?: number;
        targetFundingAmount?: number;
        targetEquityPercent?: number;
        minInvestment?: number;
        maxInvestment?: number;
        askingPrice?: number;
        currentValue?: number;
        interestRate?: number;
        termMonths?: number;
      } = {
        type: values.submissionType,
        streetAddress: values.streetAddress,
        city: values.city,
        stateOrProvince: values.stateOrProvince,
        country: values.country,
        postcode: values.postcode,
        propertyType: values.propertyType || 'RESIDENTIAL',
      };

      if (values.yearBuilt) {
        payload.yearBuilt = Number(values.yearBuilt);
      }

      // Type-specific fields
      if (values.submissionType === 'EQUITY_SALE' || values.submissionType === 'DEVELOPMENT') {
        if (values.targetFundingAmount) payload.targetFundingAmount = Number(values.targetFundingAmount);
        if (values.equityPercent) payload.targetEquityPercent = Number(values.equityPercent);
        if (values.minInvestment) payload.minInvestment = Number(values.minInvestment);
        if (values.maxInvestment) payload.maxInvestment = Number(values.maxInvestment);
      } else if (values.submissionType === 'FULL_SALE') {
        if (values.askingPrice) payload.askingPrice = Number(values.askingPrice);
        if (values.currentValue) payload.currentValue = Number(values.currentValue);
      } else if (values.submissionType === 'DEBT_VAULT') {
        if (values.borrowAmount) payload.interestRate = Number(values.interestRate) || undefined;
        if (values.termMonths) payload.termMonths = Number(values.termMonths) || undefined;
      }

      await createSubmission(payload).unwrap();
    },
  });

  const { values, handleSubmit, handleChange, isValid } = formik;

  if (isSuccess && submissionData?.data) {
    return (
      <div className='px-[5%] lg:px-[7%] py-12 font-inter'>
        <div className='rounded-[8px] border border-[#D6D3D1] bg-white p-8 max-w-2xl mx-auto'>
          <h1 className='text-3xl font-medium mb-4'>Submission received</h1>
          <p className='text-[#44403C] mb-6'>
            Your property submission has been created with status: <strong>PENDING</strong>
          </p>
          <Link href={`/dashboard/submissions/${submissionData.data.id}`} className='text-navy underline'>
            View submission details →
          </Link>
        </div>
      </div>
    );
  }

  const step1Schema = object({
    submissionType: string().required('Select a submission type'),
  });

  const step2Schema = object({
    streetAddress: string().required('Required'),
    city: string().required('Required'),
    stateOrProvince: string().required('Required'),
    country: string().required('Required'),
    postcode: string().required('Required'),
  });

  const step3Schema = object({
    ...(values.submissionType === 'EQUITY_SALE' || values.submissionType === 'DEVELOPMENT'
      ? {
          targetFundingAmount: number().required('Required'),
          equityPercent: number().min(1).max(100),
        }
      : values.submissionType === 'FULL_SALE'
      ? {
          askingPrice: number().required('Required'),
        }
      : values.submissionType === 'DEBT_VAULT'
      ? {
          borrowAmount: number().positive('Must be positive'),
          interestRate: number().min(4).max(24),
          termMonths: number().min(1).max(18),
        }
      : {}),
  });

  const validateStep = () => {
    switch (step) {
      case 1:
        return step1Schema.isValidSync({ submissionType: values.submissionType });
      case 2:
        return step2Schema.isValidSync({
          streetAddress: values.streetAddress,
          city: values.city,
          stateOrProvince: values.stateOrProvince,
          country: values.country,
          postcode: values.postcode,
        });
      case 3:
        return step3Schema.isValidSync(values);
      default:
        return false;
    }
  };

  return (
    <div className='px-[5%] lg:px-[7%] py-12 font-inter'>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-medium text-[#1C1917]'>Submit a Property</h1>
          <p className='text-sm text-[#57534E] mt-2'>
            Step {step} of 3 • {step === 1 ? 'What would you like to do?' : step === 2 ? 'Property details' : 'Financial terms'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          {/* Step 1: Type Selection */}
          {step === 1 && (
            <div className='flex flex-col gap-4'>
              {submissionTypes.map((type) => (
                <label
                  key={type.value}
                  className='flex items-start gap-3 p-4 rounded-[8px] border border-[#D6D3D1] cursor-pointer hover:bg-cream/30 transition-colors'
                >
                  <input
                    type='radio'
                    name='submissionType'
                    value={type.value}
                    checked={values.submissionType === type.value}
                    onChange={handleChange}
                    className='mt-1'
                  />
                  <div>
                    <p className='font-medium text-[#1C1917]'>{type.label}</p>
                    <p className='text-sm text-[#57534E]'>{type.description}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* Step 2: Property Details */}
          {step === 2 && (
            <div className='flex flex-col gap-4'>
              <Input
                type='text'
                label='Property address'
                id='streetAddress'
                placeholder='123 Main Street'
                value={values.streetAddress}
                onChange={handleChange}
              />
              <Input
                type='text'
                label='City'
                id='city'
                placeholder='Austin'
                value={values.city}
                onChange={handleChange}
              />
              <Input
                type='text'
                label='State/Province'
                id='stateOrProvince'
                placeholder='TX'
                value={values.stateOrProvince}
                onChange={handleChange}
              />
              <Input
                type='text'
                label='Country'
                id='country'
                placeholder='USA'
                value={values.country}
                onChange={handleChange}
              />
              <Input
                type='text'
                label='Postcode'
                id='postcode'
                placeholder='78701'
                value={values.postcode}
                onChange={handleChange}
              />
              <select
                id='propertyType'
                value={values.propertyType}
                onChange={handleChange}
                className='w-full rounded-[6px] border border-[#D6D3D1] bg-white px-4 py-3 text-sm font-medium text-[#1C1917]'
              >
                <option value=''>Property type</option>
                <option value='RESIDENTIAL'>Residential</option>
                <option value='COMMERCIAL'>Commercial</option>
                <option value='MIXED_USE'>Mixed-use</option>
              </select>
              <Input
                type='number'
                label='Year built'
                id='yearBuilt'
                placeholder='2020'
                value={values.yearBuilt}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Step 3: Financial Terms */}
          {step === 3 && (
            <div className='flex flex-col gap-4'>
              {(values.submissionType === 'EQUITY_SALE' || values.submissionType === 'DEVELOPMENT') && (
                <>
                  <Input
                    type='number'
                    label='Target funding amount (USDC)'
                    id='targetFundingAmount'
                    placeholder='500000'
                    value={values.targetFundingAmount}
                    onChange={handleChange}
                  />
                  <Input
                    type='number'
                    label='Equity % offered'
                    id='equityPercent'
                    placeholder='20'
                    value={values.equityPercent}
                    onChange={handleChange}
                  />
                  <Input
                    type='number'
                    label='Min investment (USDC)'
                    id='minInvestment'
                    placeholder='1000'
                    value={values.minInvestment}
                    onChange={handleChange}
                  />
                  <Input
                    type='number'
                    label='Max investment (USDC)'
                    id='maxInvestment'
                    placeholder='10000'
                    value={values.maxInvestment}
                    onChange={handleChange}
                  />
                </>
              )}

              {values.submissionType === 'FULL_SALE' && (
                <>
                  <Input
                    type='number'
                    label='Asking price (USDC)'
                    id='askingPrice'
                    placeholder='1000000'
                    value={values.askingPrice}
                    onChange={handleChange}
                  />
                  <Input
                    type='number'
                    label='Current value (USDC)'
                    id='currentValue'
                    placeholder='800000'
                    value={values.currentValue}
                    onChange={handleChange}
                  />
                </>
              )}

              {values.submissionType === 'DEBT_VAULT' && (
                <>
                  <Input
                    type='number'
                    label='Current property value (USDC)'
                    id='currentValue'
                    placeholder='500000'
                    value={values.currentValue}
                    onChange={handleChange}
                  />
                  <Input
                    type='number'
                    label='Amount to borrow (USDC)'
                    id='borrowAmount'
                    placeholder='50000'
                    value={values.borrowAmount}
                    onChange={handleChange}
                  />
                  <Input
                    type='number'
                    label='Interest rate (%)'
                    id='interestRate'
                    placeholder='12'
                    value={values.interestRate}
                    onChange={handleChange}
                  />
                  <select
                    id='termMonths'
                    value={values.termMonths}
                    onChange={handleChange}
                    className='w-full rounded-[6px] border border-[#D6D3D1] bg-white px-4 py-3 text-sm font-medium text-[#1C1917]'
                  >
                    <option value=''>Term (months)</option>
                    <option value={6}>6 months</option>
                    <option value={12}>12 months</option>
                    <option value={18}>18 months</option>
                  </select>
                </>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div className='flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-5'>
            {step > 1 && (
              <Button
                type='button'
                variant='outline'
                onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
                className='py-2 px-4 border-navy text-navy'
                disabled={isLoading}
              >
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                type='button'
                onClick={() => setStep((s) => (s < 3 ? ((s + 1) as Step) : s))}
                disabled={!validateStep()}
                className='py-2 px-6 bg-navy text-white'
              >
                Continue
              </Button>
            ) : (
              <Button
                type='submit'
                isLoading={isLoading}
                disabled={!isValid}
                className='py-2 px-6 bg-navy text-white'
              >
                Submit Property
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}