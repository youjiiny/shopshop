import ProductCard from './ProductCard';
import { useAuthContext } from 'context/AuthContext';
import { AuthContextType } from 'types/auth';
import { useProductQuery } from 'hooks/useProductQueries';

const Products = () => {
  const { user } = useAuthContext() as AuthContextType;
  const { isProductsLoading, products = [] } = useProductQuery(user?.uid);
  if (isProductsLoading) return <p>Loading...</p>;

  return (
    <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default Products;
