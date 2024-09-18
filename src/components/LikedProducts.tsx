import { DefaultError, useQuery } from '@tanstack/react-query';
import { getLikedProducts } from 'api/product';
import { useAuthContext } from 'context/AuthContext';
import { Link } from 'react-router-dom';
import { AuthContextType } from 'types/auth';
import { LikedProductType } from 'types/product';

const LikedProducts = () => {
  const { user } = useAuthContext() as AuthContextType;
  const {
    isLoading,
    error,
    data: products,
  } = useQuery<
    LikedProductType[],
    DefaultError,
    LikedProductType[],
    [string, string, string]
  >({
    queryKey: ['mypage', user?.uid as string, 'liked'],
    queryFn: getLikedProducts,
  });
  if (isLoading) return <p>Loading...</p>;

  return (
    <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {products &&
        products?.map((product) => {
          const { id, name, price, mainImg } = product;
          return (
            <li key={id} className='pb-6'>
              <Link to={`/products/${id}`}>
                <div className='w-full mb-3'>
                  <img
                    className='w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44'
                    src={`${import.meta.env.VITE_S3_SHOPSHOP_PRODUCT_URL}/${id}/represent/${mainImg}`}
                    alt='상품이미지'
                  />
                </div>
                <p className='text-light-gray'>{name}</p>
                <div className='text-price'>
                  <span className='font-semibold'>
                    {price.toLocaleString()}
                  </span>
                  <span className='text-sm'>원</span>
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default LikedProducts;
