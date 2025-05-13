import { motion } from 'framer-motion';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

import { multiStepVariants } from '@/utils/variants';

type Props = {
  email: string;
};

export default function SignupSuccess({ email }: Props) {
  return (
    <motion.div
      variants={multiStepVariants}
      initial='initial'
      exit='exit'
      animate='animate'
      className='flex flex-col items-center justify-center text-center gap-2'
    >
      <MdOutlineMarkEmailRead className='text-5xl' />
      <p className='font-merriweather text-2xl font-bold mt-4'>
        Verify your email address
      </p>
      <p className='font-roboto text-sm text-[#57534E]'>
        We've sent you a verification email to
      </p>
      <p className='my-4 font-roboto font-medium'>{email}</p>
      <p className='font-roboto text-sm text-[#57534E]'>
        Please verify this email address by clicking on the link found in the
        email message body.
      </p>
      <p className='font-roboto text-sm text-[#57534E] mt-4'>
        If you have not received the email after a few minutes, please check
        your spam folder.
      </p>
    </motion.div>
  );
}
