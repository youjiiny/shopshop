import { useQuery } from '@tanstack/react-query';
import { getProducts } from 'api/product';
import ProductCard from './ProductCard';
import { GetProductType } from 'types/product';
import { useEffect, useState } from 'react';
import { getLikedProduct } from 'api/like';
import { useAuthContext } from 'context/AuthContext';
import { AuthContextType } from 'types/auth';

const Products = () => {
  const { user } = useAuthContext() as AuthContextType;
  const {
    isLoading,
    data: products,
    error,
  } = useQuery<GetProductType[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const getLikedProductId = async () => {
    const likedIds = await getLikedProduct({ uid: user?.uid as string });
    setLikedProducts(likedIds);
  };

  useEffect(() => {
    if (user?.uid) {
      getLikedProductId();
    }
  }, [user?.uid]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  console.log('likedProducts', likedProducts);

  return (
    <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {products &&
        products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            likedProducts={likedProducts}
          />
        ))}
    </ul>
  );
};

export default Products;
