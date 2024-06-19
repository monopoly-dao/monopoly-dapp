import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';
import Modal, { ModalProps } from '@/components/modal';

export default function BuyPropertyModal(props: ModalProps) {
  return (
    <Modal {...props} className='h-auto w-4/5 lg:w-2/5'>
      <section className='h-full w-full bg-white p-10 flex flex-col gap-4'>
        <Input label='Number of units' id='units' />

        <Button className='py-3'>Buy</Button>
      </section>
    </Modal>
  );
}
