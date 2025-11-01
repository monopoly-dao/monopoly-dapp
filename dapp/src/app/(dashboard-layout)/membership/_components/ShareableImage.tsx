// components/ShareableImage.tsx
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export const ShareableImage = ({
  memberSince,
  status,
  totalInvested,
}: {
  memberSince: string;
  status: string;
  totalInvested: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    async function genFile() {
      if (!cardRef.current) return;

      const canvas = await html2canvas(cardRef.current);
      const image = canvas.toDataURL('image/png');
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], 'settley-membership.png', {
        type: 'image/png',
      });
      setFile(file);
    }

    genFile();
  }, [cardRef?.current]);

  console.log(file);

  const handleShare = async () => {
    console.log('here', cardRef.current);
    if (!cardRef.current) return;

    try {
      const canShareFiles =
        navigator.canShare && navigator.canShare({ files: [] });

      // For mobile devices
      if (navigator.share && file) {
        try {
          await navigator.share({
            files: [file],
            title: 'My Settley Membership',
            text: 'Join the Settley Campaign!',
            url: 'https://beta.settley.co/campaign',
          });
        } catch (shareError) {
          //   console.error('Share failed:', shareError);
          toast.error('Error sharing, please try again');
          // Fallback to download if share fails
          const link = document.createElement('a');
          link.download = 'settley-membership.png';
          //   link.href = image;
          link.click();
        }
      } else {
        // For desktop - download image
        const link = document.createElement('a');
        link.download = 'settley-membership.png';
        // link.href = image;
        link.click();
      }
    } catch (err) {
      //   console.error('Error sharing:', err);
      toast.error('Error sharing, please try again');
    }
  };

  return (
    <div className='relative'>
      {/* Shareable Card */}
      <div
        ref={cardRef}
        className='p-8 fixed top-0 left-[-9999px] rounded-xl w-[664px] border border-black'
      >
        <div className='relative'>
          <div className='flex items-center justify-between'></div>

          <div className='grid grid-cols-2 gap-y-5 gap-x-20'>
            <h2 className='text-2xl font-bold mb-6'>Settley Membership</h2>
            <div className='premium-gradient rounded-full'>{status} Member</div>
            <div>
              <p className='text-gray-400'>Member Since</p>
              <p className='text-xl font-bold'>{memberSince}</p>
            </div>
            <div>
              <p className='text-gray-400'>Total Invested</p>
              <p className='text-xl font-bold text-green-400'>
                {totalInvested}
              </p>
            </div>
            <div className='bottom-4 right-4 text-sm text-gray-400'>
              Generated on {new Date().toLocaleDateString()}
            </div>
            <div className='flex flex-col gap-4'></div>
            <div className='flex flex-col gap-4'></div>
          </div>

          <div className='flex items-center justify-between'></div>
        </div>
        <div className='flex justify-between items-start'>
          <div>
            <Image
              //   src='https://res.cloudinary.com/dpoygzdfl/image/upload/v1754416493/settley-email-confirmation_1_eoq3ll.png'
              src='/images/settley-card.png'
              alt='Settley Founder Card'
              width={600}
              height={300}
              className='mb-4'
            />
          </div>
        </div>
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className='mt-4 flex items-center gap-2 bg-navy hover:bg-navy/70 text-white px-6 py-3 rounded-full transition-all duration-300'
      >
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
          />
        </svg>
        Share Membership Stats
      </button>
    </div>
  );
};
