'use client';

import { useFormik } from 'formik';
import { object, string } from 'yup';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';
import Modal, { ModalProps } from '@/components/modal';

import { useEnterPositionMutation } from '@/api/marketplace';
import { handleErrors } from '@/utils/error';
import { formatAmount, removeNonDigit } from '@/utils/utils';

type Props = ModalProps & {
  userId: string;
  propertyId: string;
};

export default function BuyPropertyModal({
  userId,
  propertyId,
  ...props
}: Props) {
  const [enterPosition, { isLoading }] = useEnterPositionMutation();

  const { values, handleSubmit, getFieldMeta, getFieldProps } = useFormik({
    initialValues: {
      units: '0',
    },
    onSubmit: async (values) => {
      try {
        await enterPosition({
          userId,
          propertyId,
          units: Number(removeNonDigit(values.units)),
        }).unwrap();
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

            return isValid || context.createError();
          }
        ),
    }),
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
          <Button type='submit' isLoading={isLoading} className='py-3 px-10'>
            Buy
          </Button>
        </div>
      </form>
    </Modal>
  );
}
