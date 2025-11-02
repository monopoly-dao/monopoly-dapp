import { object, string } from 'yup';

export const detailsSchema = object({
  firstName: string().required('First Name is required'),
  lastName: string().required('Last Name is required'),
  phone: string().required('Phone is required'),
  email: string().required('Email is required').email('Invalid email format'),
  country: string().required('Country is required'),
  // paymentMethod: string().required('Payment Method is required'),
});

export const payCryptoSchema = object({
  cryptoAmount: string()
    .required('Amount is required')
    .test(
      'Check if amount is valid',
      'Please provide a valid amount',
      (value, context) => {
        if (!value) return context.createError();
        const cleanAmount = value.replace(/\D/g, '');

        if (Number(cleanAmount) === 0) return context.createError();

        if (!cleanAmount.length) {
          return context.createError();
        }
        const isValid = /^[0-9]+$/.test(cleanAmount);

        return isValid || context.createError();
      }
    )
    .test(
      'Check if amount is greater than or equal to 50',
      'Minimum contribution amount is $50',
      (value, context) => {
        if (!value) return context.createError();
        const cleanAmount = value.replace(/\D/g, '');

        if (Number(cleanAmount) < 50) return context.createError();

        return true;
      }
    ),
  method: string().required('Please choose a payment method'),
});
