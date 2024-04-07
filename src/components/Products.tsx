import { useQuery } from '@tanstack/react-query';
import { getProducts } from 'api/product';
import ProductCard from './ProductCard';
import { GetProductType } from 'types/product';

const Products = () => {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery<GetProductType[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {products &&
        products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </ul>
  );
};

export default Products;
