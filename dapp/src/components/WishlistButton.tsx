'use client';

import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from '../api/properties';
import { handleErrors } from '../utils/error';

type WishlistButtonProps = {
  propertyId: string;
  propertyName: string;
  isFavourite: boolean;
  size?: 'small' | 'medium' | 'large';
};

export default function WishlistButton({
  isFavourite,
  propertyId,
  propertyName,
  size = 'medium',
}: WishlistButtonProps) {
  const session = useSession();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const isLoggedIn = session.status === 'authenticated';

  async function addToWishlistFn() {
    if (!isLoggedIn) {
      toast.error('Sign in before you can add property to wishlist');
      return;
    }

    try {
      await addToWishlist({
        propertyId,
        userId: session.data.id,
      }).unwrap();

      toast.success(`${propertyName} successfully added to wishlist`);
    } catch (e) {
      handleErrors(e);
    }
  }

  async function removeFromWishlistFn() {
    if (!isLoggedIn) {
      toast.error('Sign in before you can add property to wishlist');
      return;
    }

    try {
      await removeFromWishlist({
        propertyId,
        userId: session.data.id,
      }).unwrap();

      toast.success(`${propertyName} successfully removed from wishlist`);
    } catch (e) {
      handleErrors(e);
    }
  }

  const wishlistFn = isFavourite ? removeFromWishlistFn : addToWishlistFn;

  return (
    <IconButton onClick={wishlistFn}>
      {isFavourite ? (
        <Favorite fontSize={size} />
      ) : (
        <FavoriteBorder fontSize={size} />
      )}
    </IconButton>
  );
}
