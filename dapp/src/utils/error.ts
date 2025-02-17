import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import logger from './logger';

export const parseError = (error: unknown): string => {
  logger({ error });

  if (error instanceof AxiosError) {
    return error.message;
  }

  if (typeof error === 'object' && error) {
    if ('data' in error) {
      const errorobj = error.data;

      if (typeof error.data === 'string') {
        return error.data;
      }
      if (
        errorobj &&
        typeof errorobj === 'object' &&
        'data' in errorobj &&
        errorobj.data &&
        typeof errorobj.data === 'object' &&
        'error' in errorobj.data &&
        typeof errorobj.data.error === 'string'
      ) {
        return errorobj.data.error;
      }

      if (
        errorobj &&
        typeof errorobj === 'object' &&
        'message' in errorobj &&
        typeof errorobj.message === 'string'
      ) {
        return errorobj.message;
      }
    }
  }

  return 'Something went wrong';
};

export const handleErrors = (error: unknown) => {
  logger({ error });

  if (error instanceof AxiosError) {
    logger(
      {
        error: error.message,
      },
      'Axios Error'
    );

    toast.error(error.message);
    return;
  }

  if (typeof error === 'object' && error) {
    if ('data' in error) {
      const errorobj = error.data;

      if (typeof error.data === 'string') {
        toast.error(error.data);
        logger(error.data);

        return;
      }

      if (
        errorobj &&
        typeof errorobj === 'object' &&
        'message' in errorobj &&
        typeof errorobj.message === 'string'
      ) {
        toast.error(errorobj.message);
        logger(errorobj.message);

        return;
      }

      if (
        errorobj &&
        typeof errorobj === 'object' &&
        'data' in errorobj &&
        errorobj.data &&
        typeof errorobj.data === 'object' &&
        'error' in errorobj.data &&
        typeof errorobj.data.error === 'string'
      ) {
        toast.error(errorobj.data.error);
        logger(errorobj.data);

        return;
      }

      if (
        errorobj &&
        typeof errorobj === 'object' &&
        'data' in errorobj &&
        errorobj.data &&
        typeof errorobj.data === 'object' &&
        'data' in errorobj.data &&
        errorobj.data.data &&
        typeof errorobj.data.data === 'object' &&
        'message' in errorobj.data.data &&
        errorobj.data.data &&
        errorobj.data.data.message &&
        typeof errorobj.data.data.message === 'string'
      ) {
        toast.error(errorobj.data.data.message);
        logger(errorobj.data.data.message);

        return;
      }

      if (
        errorobj &&
        typeof errorobj === 'object' &&
        'data' in errorobj &&
        errorobj.data &&
        typeof errorobj.data === 'object' &&
        'message' in errorobj.data &&
        typeof errorobj.data.message === 'string'
      ) {
        toast.error(errorobj.data.message);
        logger(errorobj.data.message);

        return;
      }

      if (
        errorobj &&
        typeof errorobj === 'object' &&
        'message' in errorobj &&
        typeof errorobj.message === 'string'
      ) {
        toast.error(errorobj.message);
        logger(errorobj.message);
        return;
      }
    }
  }
};
