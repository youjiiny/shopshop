import { useEffect, useState } from 'react';
import { useLikeMutation, useUnLikeMutation } from './useLikeProductMutation';
import { isLikedProduct } from 'api/like';

type Props = {
  uid: string;
  liked?: string[];
  productId: string;
};
type ReturnType = [boolean, () => void];

export const useLike = ({ uid, liked, productId }: Props): ReturnType => {
  const [isLiked, setIsLiked] = useState(false);
  const { mutate: likeMutate } = useLikeMutation(productId);
  const { mutate: unlikeMutate } = useUnLikeMutation(productId);

  const handleLikeMutate = () => {
    if (isLiked) {
      unlikeMutate({ uid, productId });
    } else {
      likeMutate({ uid, productId });
    }
    setIsLiked((prev) => !prev);
  };

  const checkIsLiked = async () => {
    const liked = await isLikedProduct({
      uid,
      id: productId,
    });
    setIsLiked(liked);
  };

  useEffect(() => {
    if (liked && liked?.length) {
      setIsLiked(liked.includes(productId));
    } else {
      checkIsLiked();
    }
  }, [uid, liked, productId]);

  return [isLiked, handleLikeMutate];
};
