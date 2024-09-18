import { DefaultError, useQuery } from '@tanstack/react-query';
import { getLikedProducts } from 'api/product';
import { useAuthContext } from 'context/AuthContext';
import { Link } from 'react-router-dom';
import { AuthContextType } from 'types/auth';
import { LikedProductType } from 'types/product';

const LikedProducts = () => {
  const { user } = useAuthContext() as AuthContextType;
  const { isLoading, data: products } = useQuery<
    LikedProductType[],
    DefaultError,
    LikedProductType[],
    [string, string, string]
  >({
    queryKey: ['mypage', user?.uid as string, 'liked'],
    queryFn: getLikedProducts,
  });
  if (isLoading) return <p>Loading...</p>;
  if (!products?.length)
    return (
      <div className='px-12 pt-12 pb-48'>
        <div className='pt-20 text-center  text-4xl border-t-4 md:border-b-2 border-black py-24'>
          <h3 className='text-lg md:text-3xl'>
            좋아요를 누른 상품이 없습니다.
          </h3>
          <div className='flex justify-center mt-10'>
            <Link
              to='/'
              className='flex flex-1 justify-center items-center max-w-60 md:max-w-[400px] h-14 border border-gray-500 text-lg md:text-2xl font-bold'
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <h3 className='text-2xl mb-4 pb-2 border-b-4 border-black'>My Heart</h3>
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
    </>
  );
};

export default LikedProducts;
