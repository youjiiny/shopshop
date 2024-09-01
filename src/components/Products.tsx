import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import { getLikedProduct } from 'api/like';
import { useAuthContext } from 'context/AuthContext';
import { AuthContextType } from 'types/auth';
import { useProductQuery } from 'hooks/useProductQuery';

const Products = () => {
  const { user } = useAuthContext() as AuthContextType;
  const { isProductsLoading, products } = useProductQuery();
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

  if (isProductsLoading) return <p>Loading...</p>;

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
