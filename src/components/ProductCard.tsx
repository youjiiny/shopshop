import { GetProductType } from 'types/product';
import { useNavigate } from 'react-router-dom';
import { likeProduct, unlikeProduct } from 'api/like';
import { useAuthContext } from 'context/AuthContext';
import { AuthContextType } from 'types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import HeartSvg from 'assets/svg/HeartSvg';

type Props = { product: GetProductType; likedProducts: string[] };

const ProductCard = ({ product, likedProducts }: Props) => {
  const { id, name, image, price, heartCount } = product;
  const { user } = useAuthContext() as AuthContextType;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  console.log('isLiked', isLiked, 'id', id, 'likedProducts', likedProducts);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isLiked) {
      unlike.mutate({ uid: user?.uid as string, productId: id });
    } else {
      like.mutate({ uid: user?.uid as string, productId: id });
    }
    setIsLiked((prev) => !prev);
    //
    console.log('좋아요');
  };
  const like = useMutation({
    mutationFn: likeProduct,
    onMutate: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'products') {
          const value: GetProductType[] | GetProductType | undefined =
            queryClient.getQueryData(queryKey);

          if (Array.isArray(value)) {
            const index = value.findIndex((v) => v.id === id);
            if (index > -1) {
              const shallow = [...value];
              shallow[index] = {
                ...shallow[index],
                heartCount: shallow[index].heartCount + 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            if (value.id === id) {
              const shallow = {
                ...value,
                heartCount: value.heartCount + 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onError: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'products') {
          const value: GetProductType[] | GetProductType | undefined =
            queryClient.getQueryData(queryKey);

          if (Array.isArray(value)) {
            const index = value.findIndex((v) => v.id === id);
            if (index > -1) {
              const shallow = [...value];
              shallow[index] = {
                ...shallow[index],
                heartCount: shallow[index].heartCount - 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            if (value.id === id) {
              const shallow = {
                ...value,
                heartCount: value.heartCount - 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
  });

  const unlike = useMutation({
    mutationFn: unlikeProduct,
    onMutate: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'products') {
          const value: GetProductType[] | GetProductType | undefined =
            queryClient.getQueryData(queryKey);

          if (Array.isArray(value)) {
            const index = value.findIndex((v) => v.id === id);
            if (index > -1) {
              const shallow = [...value];
              shallow[index] = {
                ...shallow[index],
                heartCount: shallow[index].heartCount - 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            if (value.id === id) {
              const shallow = {
                ...value,
                heartCount: value.heartCount - 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onError: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'products') {
          const value: GetProductType[] | GetProductType | undefined =
            queryClient.getQueryData(queryKey);

          if (Array.isArray(value)) {
            const index = value.findIndex((v) => v.id === id);
            if (index > -1) {
              const shallow = [...value];
              shallow[index] = {
                ...shallow[index],
                heartCount: shallow[index].heartCount + 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            if (value.id === id) {
              const shallow = {
                ...value,
                heartCount: value.heartCount + 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
  });

  useEffect(() => {
    if (likedProducts.length) {
      setIsLiked(likedProducts.includes(id));
    }
  }, [likedProducts, id]);

  return (
    <li className='cursor-pointer' onClick={() => navigate(`/products/${id}`)}>
      <div>
        <img
          className='w-96 h-96 md:w-72 md:h-72'
          src={image}
          alt='product image'
        />
      </div>
      <div className='mt-2 px-2'>
        <h3 className='truncate'>{name}</h3>
        <p className='font-semibold text-price'>{`${price.toLocaleString()}원`}</p>
        <button className='flex items-center' onClick={handleLike}>
          <HeartSvg isLiked={isLiked} />
          <p className='m-1'>{heartCount}</p>
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
