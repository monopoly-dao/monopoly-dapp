import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { FaEthereum } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoCopyOutline } from 'react-icons/io5';
import { object, string } from 'yup';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import { Input } from '@/components/input';

import { useAppDispatch, useAppSelector } from '@/store';

import { useCampaignSignupMutation } from '@/api/auth';
import { useJoinCampaignMutation } from '@/api/campaign';
import { SettleyTicketer } from '@/sdk/ticketSDK';
import { setCampaignPaymentStage } from '@/slices/campaignPaymentSlice';
import { handleErrors } from '@/utils/error';
import { removeNonDigit } from '@/utils/utils';
import { multiStepVariants } from '@/utils/variants';

// https://cyan-traditional-woodpecker-474.mypinata.cloud/ipfs/bafkreido3sqpogvdk74uoraoh6wkl6crmrjt3wm7wxkwvo44o2hw5pfflu
// https://cyan-traditional-woodpecker-474.mypinata.cloud/ipfs/bafkreib5wjrykhvhxgir25xyxeusi63w45kzyl3hxnb6qhmzqxasec6uve

export default function CryptoAddress() {
  const {
    walletAddress,
    method,
    cryptoAmount,
    firstName,
    lastName,
    email,
    phone,
    country,
  } = useAppSelector((state) => state.campaignPayment);
  const [joinCampaign, { isLoading }] = useJoinCampaignMutation();
  const [campaignSignup, { isLoading: isCampaignSignupLoading }] =
    useCampaignSignupMutation();
  // const [wallet] = useState<null | WalletClient>(null);
  // const { address } = useAccount();
  // const { disconnect } = useDisconnect();
  // const { data: ensName } = useEnsName({ address });
  // const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  // useWalletClient();

  // console.log({ address, data }, data?.getAddresses());

  const dispatch = useAppDispatch();

  const settleyTicketer = new SettleyTicketer(
    'https://base-mainnet.g.alchemy.com/v2/yFt4FMjAbq32jZAKaYEd2CjQHQenxTQl',
    '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
  );

  const initialValues = useMemo(
    () => ({
      ...{ walletAddress: '' },
      walletAddress,
    }),
    [walletAddress]
  );

  useEffect(() => {
    (async () => {
      await settleyTicketer.connectWallet();

      // const address = (await settleyTicketer.getSignerAddress()) || '';
      // console.log(address);

      // await settleyTicketer.setBaseURI(
      //   'https://cyan-traditional-woodpecker-474.mypinata.cloud/ipfs/bafkreido3sqpogvdk74uoraoh6wkl6crmrjt3wm7wxkwvo44o2hw5pfflu/'
      // );

      await settleyTicketer.mintToken(
        2,
        'https://cyan-traditional-woodpecker-474.mypinata.cloud/ipfs/bafkreido3sqpogvdk74uoraoh6wkl6crmrjt3wm7wxkwvo44o2hw5pfflu/',
        '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'
      );

      await settleyTicketer.getAllPurchases();
      // console.log({ purchases });
    })();
  }, []);

  const { handleSubmit, getFieldProps, getFieldMeta, values, isValid } =
    useFormik({
      initialValues,
      onSubmit: async (values) => {
        try {
          // await axios.post('http://localhost:8001/ticket', {
          //   stablecoinAddress: 'stablecoin',
          //   numberOfTickets: 5,
          //   walletClient: wallet,
          // });

          await joinCampaign({
            firstName,
            lastName,
            email,
            phone,
            country,
            walletAddress: values.walletAddress,
            type: method === 'metamask' ? 'wallet' : 'transfer',
            amount: Number(removeNonDigit(cryptoAmount)),
          }).unwrap();

          await campaignSignup({
            email,
          }).unwrap();

          dispatch(setCampaignPaymentStage('success'));
        } catch (e) {
          handleErrors(e);
        }
      },
      validationSchema: object({
        walletAddress: string().required(''),
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

    // try {
    //   const walletClient = await ConnectWalletClient();

    //   setWallet(walletClient);
    //   // Performs Wallet Action to retrieve wallet address
    //   const [address] = await walletClient.getAddresses();

    //   await setFieldValue('walletAddress', address, true);
    // } catch (e) {
    //   toast.error('Error connecting to wallet');
    // }

    await settleyTicketer.connectWallet();

    // const address = (await settleyTicketer.getSignerAddress()) || '';
    // console.log(address);

    // await settleyTicketer.setBaseURI(
    //   'https://cyan-traditional-woodpecker-474.mypinata.cloud/ipfs/bafkreido3sqpogvdk74uoraoh6wkl6crmrjt3wm7wxkwvo44o2hw5pfflu/'
    // );

    await settleyTicketer.mintToken(
      2,
      'https://cyan-traditional-woodpecker-474.mypinata.cloud/ipfs/bafkreido3sqpogvdk74uoraoh6wkl6crmrjt3wm7wxkwvo44o2hw5pfflu/',
      '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'
    );

    await settleyTicketer.getAllPurchases();
    // console.log({ purchases });

    // console.log(address);

    handleSubmit();
  }

  function copyWalletAddress(address: string) {
    navigator.clipboard.writeText(address);
    toast.success('Wallet address copied!');
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

      <div className='col-span-2'>
        {/* <Input
          id='walletAddress'
          label='Wallet Address'
          placeholder='0x.....'
          {...getFormikInputProps('walletAddress')}
          containerClassName='border-[#D0D5DD] rounded-[8px]'
        /> */}

        {method === 'metamask' && (
          <div className='flex flex-col gap-5 w-full mb-5'>
            <p className='flex items-center gap-4 font-roboto text-sm w-full'>
              Please make sure your metamask extension is opened and active
              before clicking below
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
        )}
      </div>

      {method === 'cex' && (
        <>
          <div className='flex flex-col gap-4 col-span-2'>
            <div className='flex flex-col gap-1'>
              <p className='text-[#344054] text-sm font-medium'>Send</p>
              <div
                className='col-span-2 rounded-[8px] border border-[#D0D5DD] py-[10px] text-sm font-roboto px-[14px] flex items-center gap-4 justify-between text-navy'
                style={{ boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' }}
              >
                <div className='flex items-center gap-2'>
                  <p>USDT</p>
                  <Image
                    src='/svg/usdt.svg'
                    alt='usdt'
                    width={24}
                    height={24}
                  />
                </div>
                <div className='flex items-center gap-2'>
                  <p>USDC</p>
                  <Image
                    src='/svg/usdc.svg'
                    alt='usdc'
                    width={24}
                    height={24}
                  />
                </div>

                <div className='flex items-center gap-2'>
                  <p>Ethereum</p>

                  <FaEthereum className='text-2xl' />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <p className='text-[#344054] text-sm font-medium flex items-center gap-2'>
                To this address on Base{' '}
                <Image src='/svg/base.svg' alt='base' width={20} height={20} />
              </p>
              <div
                className='rounded-[8px] border border-[#D0D5DD] py-[10px] font-roboto px-[14px] flex items-center gap-2 justify-between text-navy'
                style={{ boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' }}
              >
                <p className='w-3/4 truncate'>
                  0x477Dcf3e536386c34D4B3001b4210Bb27CB53552
                </p>
                <IconButton
                  variant='ghost'
                  className='text-2xl'
                  icon={IoCopyOutline}
                  onClick={() =>
                    copyWalletAddress(
                      '0x477Dcf3e536386c34D4B3001b4210Bb27CB53552'
                    )
                  }
                />
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <Input
                id='walletAddress'
                label='Wallet Address'
                placeholder='0x.....'
                {...getFormikInputProps('walletAddress')}
                containerClassName='border-[#D0D5DD] rounded-[8px]'
              />
              <p className='text-[#344054] text-sm font-medium flex items-center gap-2'>
                Please provide your wallet address to enable us confirm your
                payment.
              </p>
            </div>
          </div>

          <div className='flex justify-center col-span-2'>
            <Image
              src='/images/base-qr-code.jpg'
              alt='QR code'
              width={200}
              height={200}
              className='rounded-[16px]'
            />
          </div>

          <p className='font-roboto col-span-2 text-center text-sm text-[#344054]'>
            After sending, click the button below to confirm your payment
          </p>

          <div className='mb-14 col-span-2 flex flex-col items-center gap-5'>
            <Button
              className='!rounded-[100px] w-full uppercase font-roboto py-3'
              type='submit'
              isLoading={isLoading || isCampaignSignupLoading}
              disabled={!isValid}
            >
              I’ve completed my payment
            </Button>
          </div>
        </>
      )}
    </motion.form>
  );
}
