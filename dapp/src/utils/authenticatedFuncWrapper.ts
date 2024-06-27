import toast from 'react-hot-toast';

export default function authenticatedFuncWrapper(
  func: () => void,
  status: 'authenticated' | 'unauthenticated' | 'loading'
) {
  if (status === 'authenticated') func();
  else toast.error('Please login before performing this action');
  //   return null;
}
