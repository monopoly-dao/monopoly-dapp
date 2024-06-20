'use client';

import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

import IconButton from './buttons/IconButton';
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from '../api/properties';
import { handleErrors } from '../utils/error';

type WishlistButtonProps = {
  propertyId: string;
  propertyName: string;
  isFavourite: boolean;
};

export default function WishlistButton({
  isFavourite,
  propertyId,
  propertyName,
}: WishlistButtonProps) {
  const session = useSession();
  const [addToWishlist, { isLoading: isAddLoading }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemoveLoading }] =
    useRemoveFromWishlistMutation();

  const isLoggedIn = session.status === 'authenticated';

  async function addToWishlistFn() {
    if (!isLoggedIn) {
      toast.error('Sign in before you can add a property to bookmarks');
      return;
    }

    try {
      await addToWishlist({
        propertyId,
        userId: session.data.id,
      }).unwrap();

      toast.success(`${propertyName} successfully added to bookmarks`);
    } catch (e) {
      handleErrors(e);
    }
  }

  async function removeFromWishlistFn() {
    if (!isLoggedIn) {
      toast.error('Sign in before you can remove a property from bookmarks');
      return;
    }

    try {
      await removeFromWishlist({
        propertyId,
        userId: session.data.id,
      }).unwrap();

      toast.success(`${propertyName} successfully removed from bookmarks`);
    } catch (e) {
      handleErrors(e);
    }
  }

  const wishlistFn = isFavourite ? removeFromWishlistFn : addToWishlistFn;
  const isLoading = isAddLoading || isRemoveLoading;

  return (
    <IconButton
      variant='ghost'
      onClick={wishlistFn}
      isLoading={isLoading}
      className='text-2xl absolute top-6 right-4 z-[2] p-2 rounded-[100%] bg-white'
      icon={isFavourite ? FaBookmark : FaRegBookmark}
    />
  );
}
