import { useQuery } from '@tanstack/react-query';
import { getProducts } from 'api/product';
import { GetProductType } from 'types/product';
import AdminProductCard from './AdminProductCard';
import SideBar from './SideBar';

const ProductManagement = () => {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery<GetProductType[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className='px-5 pb-16'>
      <section className='flex -full sm:pt-24'>
        <div className='hidden md:block px-6 pb-12 lg:px-12 lg:pb-24'>
          <aside>
            <SideBar />
          </aside>
        </div>
        <div className='flex-1'>
          <div className='w-full mb-5'>
            <h3 className='font-semibold'>전체 상품</h3>
          </div>
          <ul className='flex flex-col gap-4'>
            {products?.map((product) => (
              <AdminProductCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProductManagement;
