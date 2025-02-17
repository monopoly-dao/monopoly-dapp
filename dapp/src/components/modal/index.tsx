'use client';

import { useId } from 'react';
import ReactModal from 'react-modal';

import { cn } from '@/lib/utils';

import ModalActionButton from '@/components/modal/modal-action-button';
import ModalContent from '@/components/modal/modal-content';

// const CUSTOM_STYLES: ReactModal.Styles = {
//   content: {
//     width: '95vw',
//     maxWidth: 500,
//     maxHeight: '95vh',
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     borderColor: 'white',
//     padding: 0,
//   },
//   overlay: { backgroundColor: 'rgb(25, 27, 31, .5)' },
// };

ReactModal.setAppElement('body');

export { ModalActionButton, ModalContent };

export interface ModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleOpenModal: (value?: string) => void;
  className?: string;
  onAfterClose?: () => void;
}

interface IModal extends React.PropsWithChildren, ModalProps {
  title?: string;
  subtitle?: string;
}

const Modal: React.FC<IModal> = ({
  title,
  subtitle,
  isOpen,
  children,
  handleCloseModal,
  onAfterClose,
  className,
}) => {
  const id = useId();

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      portalClassName={id}
      contentLabel={title}
      onAfterClose={onAfterClose}
      closeTimeoutMS={300}
      style={{
        overlay: {
          backgroundColor: '#191B1F80',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
        },
        content: {
          outline: 'none',
        },
      }}
      shouldCloseOnEsc
      shouldReturnFocusAfterClose={true}
      ariaHideApp={false}
      className={cn(
        'no-scrollbar max-h-[95%] overflow-y-auto overflow-x-hidden rounded-lg border-0 bg-white outline-none md:max-h-[calc(100vh-2rem)]',
        [className && className]
      )}
    >
      {title || subtitle ? (
        <div className='sticky top-0 mb-5 space-y-2 border-b bg-white px-5 pb-3 pt-5 md:px-7'>
          <h3 className='font-medium'>{title}</h3>
          <p className='text-sm'>{subtitle}</p>
        </div>
      ) : null}
      {children}
    </ReactModal>
  );
};

export default Modal;
