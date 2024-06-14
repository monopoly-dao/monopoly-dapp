import * as Yup from 'yup';

export const initialValues = {
  search: '',
};

export const validationSchema = Yup.object({
  search: Yup.string().typeError('only string values'),
});
