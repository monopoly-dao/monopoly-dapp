'use client';

import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
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
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  async function addToWishlistFn() {
    try {
      await addToWishlist(propertyId).unwrap();

      toast.success(`${propertyName} successfully added to wishlist`);
    } catch (e) {
      handleErrors(e);
    }
  }

  async function removeFromWishlistFn() {
    try {
      await removeFromWishlist(propertyId).unwrap();

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
