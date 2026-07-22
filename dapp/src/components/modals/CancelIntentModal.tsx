'use client';

import Button from '@/components/buttons/Button';
import Modal from '@/components/modal';
import { useCancelBorrowIntentMutation, useCancelLendIntentMutation } from '@/api/vaults';

type Props = {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleOpenModal: () => void;
  loanId: string;
  intentType: 'borrow' | 'lend';
};

export default function CancelIntentModal({
  isOpen,
  handleCloseModal,
  handleOpenModal,
  loanId,
  intentType,
}: Props) {
  const [cancelBorrow, { isLoading: isLoadingBorrow }] = useCancelBorrowIntentMutation();
  const [cancelLend, { isLoading: isLoadingLend }] = useCancelLendIntentMutation();
  const isLoading = isLoadingBorrow || isLoadingLend;

  const handleCancel = async () => {
    if (intentType === 'borrow') {
      await cancelBorrow(loanId).unwrap();
    } else {
      await cancelLend(loanId).unwrap();
    }
    handleCloseModal();
  };

  const title = intentType === 'borrow' ? 'Cancel your loan request' : 'Cancel your lend intent';

  return (
    <Modal
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      handleOpenModal={handleOpenModal}
      title={title}
      className='w-[92%] max-w-[420px]'
    >
      <div className='flex flex-col gap-4 p-6 sm:p-8'>
        <p className='text-sm text-[#44403C]'>
          Cancelling this request will:
        </p>
        <ul className='text-sm text-[#44403C] list-disc pl-5 space-y-1'>
          <li>Remove your {intentType === 'borrow' ? 'borrow intent' : 'lend intent'} from the LoanBook contract</li>
          {intentType === 'borrow' && <li>Return your pledged collateral</li>}
          <li>Close this request permanently</li>
        </ul>

        <p className='text-sm text-[#57534E]'>Are you sure?</p>

        <div className='flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-5'>
          <Button
            type='button'
            variant='outline'
            onClick={handleCloseModal}
            disabled={isLoading}
            className='py-2 px-4 border-navy text-navy'
          >
            Keep Request
          </Button>
          <Button
            type='button'
            onClick={handleCancel}
            isLoading={isLoading}
            className='py-2 px-6 bg-navy text-white'
          >
            Cancel Request
          </Button>
        </div>
      </div>
    </Modal>
  );
}