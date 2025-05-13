import { FaCircleCheck } from 'react-icons/fa6';
import { MdCancel } from 'react-icons/md';

type Props = {
  checked: boolean;
  label: string;
};

const PasswordChecklist = ({ checked, label }: Props) => {
  return (
    <div className='flex items-center gap-2'>
      {checked && <FaCircleCheck className='text-navy text-xl' />}
      {!checked && <MdCancel className='text-xl text-[red]/50' />}
      <p className='text-sm font-plus-jakarta-sans text-[#3B3C4A]'>{label}</p>
    </div>
  );
};

export default PasswordChecklist;
