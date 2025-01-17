import { DefaultError, useQuery } from '@tanstack/react-query';
import { getLikedProducts } from 'api/product';
import { useAuthContext } from 'context/AuthContext';
import { AuthContextType } from 'types/auth';
import { LikedProductType } from 'types/product';
import EmptyLikedProducts from './EmptyLikedProducts';
import mypageKeys from 'queries/mypageKeys';
import ProductCard from './ProductCard';

const LikedProducts = () => {
  const { user } = useAuthContext() as AuthContextType;
  const { isLoading, data: products } = useQuery<
    LikedProductType[],
    DefaultError,
    LikedProductType[],
    [string, string, string]
  >({
    queryKey: mypageKeys.liked(user?.uid || ''),
    queryFn: getLikedProducts,
  });
  if (isLoading) return <p>Loading...</p>;
  if (!products?.length) {
    return <EmptyLikedProducts />;
  }

  return (
    <>
      <h3 className='text-2xl mb-4 pb-2 border-b-4 border-black'>My Heart</h3>
      <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 p-4'>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
};

export default LikedProducts;
