'use client';

import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { object, string } from 'yup';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';
import Modal, { ModalProps } from '@/components/modal';

import { useEnterPositionMutation } from '@/api/marketplace';
import { handleErrors } from '@/utils/error';
import { formatAmount, removeNonDigit } from '@/utils/utils';

type Props = ModalProps & {
  userFirebaseId: string;
  propertyId: string;
  propertyName?: string;
  propertySymbol?: string;
  tokensLeft?: string;
  pricePerToken?: number;
};

export default function BuyPropertyModal({
  userFirebaseId,
  propertyId,
  propertyName,
  propertySymbol,
  tokensLeft,
  pricePerToken = 1,
  ...props
}: Props) {
  const [enterPosition, { isLoading }] = useEnterPositionMutation();
  const availableTokens = Number(removeNonDigit(tokensLeft ?? '0'));

  const { values, handleSubmit, getFieldMeta, getFieldProps, isValid } =
    useFormik({
      initialValues: {
        units: '',
      },
      onSubmit: async (values) => {
        const tokenCount = Number(removeNonDigit(values.units));

        try {
          await enterPosition({
            userFirebaseId,
            propertyId,
            units: tokenCount,
          }).unwrap();

          toast.success(`You bought ${formatAmount(tokenCount)} property tokens`);
          props.handleCloseModal();
        } catch (e) {
          handleErrors(e);
        }
      },
      validationSchema: object({
        units: string()
          .required('Please provide a valid amount')
          .test(
            'Check if amount is valid',
            'Please provide a valid amount',
            (value, context) => {
              if (!value) return context.createError();
              const cleanAmount = value.replace(/\D/g, '');

              if (!cleanAmount.length) {
                return context.createError();
              }
              const isValid = /^[0-9]+$/.test(cleanAmount);

              if (!isValid) return context.createError();

              const tokenCount = Number(cleanAmount);

              if (tokenCount < 1) {
                return context.createError({
                  message: 'Enter at least 1 token',
                });
              }

              if (availableTokens && tokenCount > availableTokens) {
                return context.createError({
                  message: `Only ${formatAmount(availableTokens)} tokens are available`,
                });
              }

              return true;
            }
          ),
      }),
      validateOnBlur: true,
      validateOnMount: true,
      validateOnChange: true,
    });

  function getFormikInputProps(id: keyof typeof values) {
    return {
      ...getFieldProps(id),
      ...getFieldMeta(id),
    };
  }

  const tokenCount = Number(removeNonDigit(values.units));
  const estimatedTotal = tokenCount * pricePerToken;
  const hasTokenCount = tokenCount > 0;

  return (
    <Modal {...props} className='h-auto w-[92%] max-w-[560px]'>
      <form
        onSubmit={handleSubmit}
        className='h-full w-full bg-white p-6 sm:p-10 flex flex-col gap-6'
      >
        <div>
          <p className='text-2xl font-medium'>Buy Property Tokens</p>
          <p className='mt-2 text-sm text-dark-grey'>
            Choose how many property tokens you want to buy. Tokens represent
            your documented stake in this property.
          </p>
        </div>

        <Input
          label='Number of tokens'
          id='units'
          placeholder='Enter token amount'
          {...getFormikInputProps('units')}
          value={values.units ? formatAmount(values.units) : ''}
        />

        <div className='rounded-[8px] border border-[#D6D3D1] bg-light-grey/60 p-4'>
          <div className='flex items-start justify-between gap-4 border-b border-[#D6D3D1] pb-3'>
            <div>
              <p className='text-sm text-dark-grey'>Property</p>
              <p className='font-medium'>{propertyName ?? 'Selected property'}</p>
            </div>
            {propertySymbol && (
              <p className='rounded-full border border-[#D6D3D1] px-3 py-1 text-xs font-medium text-dark-grey'>
                ${propertySymbol}
              </p>
            )}
          </div>

          <div className='mt-4 flex flex-col gap-3 text-sm'>
            <div className='flex justify-between gap-4'>
              <span className='text-dark-grey'>Price per token</span>
              <span className='font-medium'>{formatAmount(pricePerToken, '$')}</span>
            </div>
            <div className='flex justify-between gap-4'>
              <span className='text-dark-grey'>Tokens selected</span>
              <span className='font-medium'>
                {hasTokenCount ? formatAmount(tokenCount) : '0'}
              </span>
            </div>
            <div className='flex justify-between gap-4'>
              <span className='text-dark-grey'>Tokens left</span>
              <span className='font-medium'>
                {availableTokens ? formatAmount(availableTokens) : 'Not available'}
              </span>
            </div>
            <div className='flex justify-between gap-4 border-t border-[#D6D3D1] pt-3 text-base'>
              <span className='font-medium'>Estimated total</span>
              <span className='font-semibold text-navy'>
                {hasTokenCount ? formatAmount(estimatedTotal, '$') : '$ 0'}
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-5'>
          <Button
            className='py-3 px-10'
            variant='outline'
            onClick={props.handleCloseModal}
            fullWidth
          >
            Close
          </Button>
          <Button
            type='submit'
            isLoading={isLoading}
            disabled={!isValid}
            className='py-3 px-10'
            fullWidth
          >
            Buy Tokens
          </Button>
        </div>
        {isLoading && (
          <p className='text-red-400 text-sm my-2'>
            Buying property tokens could take some time, please hold on
          </p>
        )}
      </form>
    </Modal>
  );
}
