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
  balance: number;
};

export default function BuyPropertyModal({
  userFirebaseId,
  propertyId,
  balance,
  ...props
}: Props) {
  const [enterPosition, { isLoading }] = useEnterPositionMutation();

  const { values, handleSubmit, getFieldMeta, getFieldProps, isValid, dirty } =
    useFormik({
      initialValues: {
        units: '0',
      },
      onSubmit: async (values) => {
        try {
          await enterPosition({
            userFirebaseId,
            propertyId,
            units: Number(removeNonDigit(values.units)),
          }).unwrap();

          toast.success(
            // `You have successfully bought ${values.units} units of this property`
            `Transaction successful.`
          );
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

              if (!cleanAmount.length || cleanAmount === '0') {
                return context.createError();
              }
              const isValid = /^[0-9]+$/.test(cleanAmount);

              return isValid || context.createError();
            }
          )
          .test(
            'Check if amount is greater thanbalance',
            'Amount is greater than available balance',
            (value, context) => {
              if (!value) return context.createError();
              const cleanAmount = value.replace(/\D/g, '');

              if (Number(cleanAmount) > balance) {
                return context.createError();
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

  return (
    <Modal {...props} className='h-auto w-4/5 lg:w-2/5'>
      <form
        onSubmit={handleSubmit}
        className='h-full w-full bg-white p-10 flex flex-col gap-4'
      >
        <Input
          label='Number of units'
          id='units'
          {...getFormikInputProps('units')}
          value={formatAmount(values.units)}
        />

        <div className='flex items-center gap-5'>
          <Button
            className='py-3 px-10'
            variant='outline'
            onClick={props.handleCloseModal}
          >
            Close
          </Button>
          <Button
            type='submit'
            isLoading={isLoading}
            disabled={!isValid || !dirty}
            className='py-3 px-10'
          >
            Buy
          </Button>
        </div>
        {isLoading && (
          <p className='text-red-400 text-sm my-2'>One Minute⏰.</p>
        )}
      </form>
    </Modal>
  );
}
