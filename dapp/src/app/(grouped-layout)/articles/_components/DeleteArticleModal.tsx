'use client';

import Button from '@/components/buttons/Button';
import Modal, { ModalProps } from '@/components/modal';

import { handleErrors } from '@/utils/error';

type Props = ModalProps & {
  articleId?: string | null;
  onConfirm: (id: string) => Promise<void> | void;
  isLoading?: boolean;
};

export default function DeleteArticleModal({
  articleId,
  onConfirm,
  isLoading,
  ...props
}: Props) {
  async function handleDelete() {
    if (!articleId) return;
    try {
      await onConfirm(articleId);
      // props.handleCloseModal();
    } catch (e) {
      handleErrors(e);
    }
  }

  return (
    <Modal {...props} className='w-11/12 max-w-md p-0'>
      <div className='bg-white p-6'>
        <h3 className='text-lg font-medium mb-2'>Delete article</h3>
        <p className='text-sm text-gray-600 mb-6'>
          Are you sure you want to permanently delete this article? This action
          cannot be undone.
        </p>

        <div className='flex items-center gap-4'>
          <Button
            variant='outline'
            onClick={props.handleCloseModal}
            className='py-2 px-4'
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            isLoading={isLoading}
            className='py-2 px-4 bg-red-500 border-red-500'
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
