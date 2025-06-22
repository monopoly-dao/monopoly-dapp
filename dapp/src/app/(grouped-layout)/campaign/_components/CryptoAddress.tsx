import axios from 'axios';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { LuBitcoin } from 'react-icons/lu';
import { WalletClient } from 'viem';
import { object, string } from 'yup';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';

import { useAppDispatch, useAppSelector } from '@/store';

import { setCampaignPaymentStage } from '@/slices/campaignPaymentSlice';
import { handleErrors } from '@/utils/error';
import { multiStepVariants } from '@/utils/variants';

import { ConnectWalletClient } from '../_utils/paymentClient';

export default function CryptoAddress() {
  const { walletAddress } = useAppSelector((state) => state.campaignPayment);
  const [wallet, setWallet] = useState<null | WalletClient>(null);
  // const { address } = useAccount();
  // const { disconnect } = useDisconnect();
  // const { data: ensName } = useEnsName({ address });
  // const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  // useWalletClient();

  // console.log({ address, data }, data?.getAddresses());

  const dispatch = useAppDispatch();

  const initialValues = useMemo(
    () => ({
      ...{ walletAddress: '' },
      walletAddress,
    }),
    [walletAddress]
  );

  const { values, getFieldMeta, getFieldProps, setFieldValue, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: async () => {
        // dispatch(setCampaignPaymentStage('success'));
        try {
          await axios.post('http://localhost:8001/ticket', {
            stablecoinAddress: 'stablecoin',
            numberOfTickets: 5,
            walletClient: wallet,
          });
        } catch (e) {
          handleErrors(e);
        }
      },
      validationSchema: object({
        walletAddress: string().optional(),
      }),
      validateOnMount: true,
      validateOnBlur: true,
      validateOnChange: true,
    });

  // useEffect(() => {
  //   if (address) {
  //     setFieldValue('address', address);
  //   }
  // }, [address, setFieldValue]);

  const getFormikInputProps = (id: keyof typeof values) => {
    return {
      ...getFieldProps(id),
      ...getFieldMeta(id),
    };
  };

  async function connectMetamask() {
    // if (typeof window.ethereum === 'undefined') {
    //   alert('Install MetaMask extension!!');
    //   return;
    // }
    // try {
    //   const accounts = await window.ethereum.request({
    //     method: 'eth_requestAccounts',
    //   });
    //   await setFieldValue('walletAddress', accounts[0], true);
    // } catch (error) {
    //   toast.error('Error connecting to Metamask');
    // }

    try {
      const walletClient = await ConnectWalletClient();

      setWallet(walletClient);
      // Performs Wallet Action to retrieve wallet address
      const [address] = await walletClient.getAddresses();

      await setFieldValue('walletAddress', address, true);
    } catch (e) {
      toast.error('Error connecting to wallet');
    }
  }

  return (
    <motion.form
      variants={multiStepVariants}
      initial='initial'
      onSubmit={handleSubmit}
      exit='exit'
      animate='animate'
      className='grid grid-cols-2 gap-x-3 gap-y-5'
    >
      <div className='col-span-2 flex flex-col gap-1'>
        <Button
          variant='ghost'
          className='w-fit bg-transparent px-0 font-roboto border-none'
          leftIcon={IoIosArrowRoundBack}
          onClick={() => dispatch(setCampaignPaymentStage('crypto'))}
          type='button'
        >
          Back
        </Button>
      </div>

      <div
        className='col-span-2 rounded-[8px] border border-[#D0D5DD] py-[10px] font-roboto px-[14px] flex items-center gap-2 text-navy'
        style={{ boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' }}
      >
        <LuBitcoin className='text-2xl text-primary-orange' /> Bitcoin (BTC)
      </div>

      <div className='col-span-2'>
        <Input
          id='walletAddress'
          label='Wallet Address'
          placeholder='0x.....'
          {...getFormikInputProps('walletAddress')}
          containerClassName='border-[#D0D5DD] rounded-[8px]'
        />

        <div className='flex flex-col gap-5 w-full mb-5'>
          <p className='flex items-center gap-4 text-center font-roboto text-sm w-full justify-center'>
            or connect with
          </p>
          <button
            type='button'
            className='w-full flex items-center gap-2 rounded-[8px] bg-slate-300 font-roboto border border-[#D6D3D1] justify-center px-10 py-3 !text-sm'
            onClick={connectMetamask}
          >
            Continue with Metamask
            <Image
              src='/svg/metamask.svg'
              alt='metamask'
              width={24}
              height={24}
            />
          </button>
          {/* <WalletOptions /> */}
        </div>
      </div>

      {/* <div className='flex flex-col gap-[6px] col-span-2'>
        <p className='text-[#344054] text-sm font-medium'>
          Send to this address
        </p>
        <div
          className='rounded-[8px] border border-[#D0D5DD] py-[10px] font-roboto px-[14px] flex items-center gap-2 justify-between text-navy'
          style={{ boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' }}
        >
          <p className='w-3/4 truncate'>
            bcajfkbkj123487djwh84rioc8usyg7u3bfiievh8wqu
          </p>
          <IconButton
            variant='ghost'
            className='text-2xl'
            icon={IoCopyOutline}
          />
        </div>
      </div> */}

      <div className='flex justify-center col-span-2'>
        <Image
          src='/images/QR code.png'
          alt='QR code'
          width={200}
          height={200}
        />
      </div>

      <p className='font-roboto col-span-2 text-center text-sm text-[#344054]'>
        After sending, click the button below to confirm your payment
      </p>

      <div className='mb-14 col-span-2 flex flex-col items-center gap-5'>
        <Button
          className='!rounded-[100px] w-full uppercase font-roboto py-3'
          type='submit'
        >
          I’ve completed my payement
        </Button>
      </div>
    </motion.form>
  );
}
