import Image from 'next/image';
import { AiOutlineRetweet } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';

interface TwitterCardProps {
  authorName: string;
  authorHandle: string;
  content: string;
  timestamp: string;
  likes?: number;
  retweets?: number;
  replies?: number;
}

export default function TwitterCard({
  authorName,
  authorHandle,
  content,
  timestamp,
  likes = 0,
  retweets = 0,
  replies = 0,
}: TwitterCardProps) {
  return (
    <div className='max-w-xl bg-white rounded-xl border border-gray-200 p-4'>
      <div className='flex items-start space-x-3'>
        <div className='flex-shrink-0'>
          <Image
            src={`https://ui-avatars.com/api/?name=${authorName}&background=2563eb&color=fff`}
            alt={authorName}
            width={48}
            height={48}
            className='rounded-full'
          />
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center space-x-1'>
            <p className='text-sm font-bold text-gray-900'>{authorName}</p>
            <span className='text-sm text-gray-500'>@{authorHandle}</span>
            <span className='text-sm text-gray-500'>·</span>
            <span className='text-sm text-gray-500'>{timestamp}</span>
          </div>
          <p className='text-gray-800 mt-1'>{content}</p>

          <div className='flex items-center justify-between mt-4 max-w-md'>
            <div className='flex items-center text-gray-500 hover:text-blue-500 transition'>
              <BsChat className='h-5 w-5 mr-2' />
              <span className='text-sm'>{replies}</span>
            </div>
            <div className='flex items-center text-gray-500 hover:text-green-500 transition'>
              <AiOutlineRetweet className='h-5 w-5 mr-2' />
              <span className='text-sm'>{retweets}</span>
            </div>
            <div className='flex items-center text-gray-500 hover:text-red-500 transition'>
              <CiHeart className='h-5 w-5 mr-2' />
              <span className='text-sm'>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
