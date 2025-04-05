import { DefaultError, useQuery } from '@tanstack/react-query';
import { getUploaderProducts } from 'api/product';
import { GetProductType } from 'types/product';
import AdminProductCard from './AdminProductCard';
import SideBar from './SideBar';
import { useAuthContext } from 'context/AuthContext';
import { AuthContextType } from 'types/auth';
import MetaTag from './MetaTag';

const ProductManagement = () => {
  const { user } = useAuthContext() as AuthContextType;
  const {
    isLoading,
    data: products,
    error,
  } = useQuery<
    GetProductType[],
    DefaultError,
    GetProductType[],
    [string, string, string]
  >({
    queryKey: ['products', 'uploader', user?.uid as string],
    queryFn: getUploaderProducts,
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <MetaTag title='상품 관리 - Shopshop' />
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
    </>
  );
};

export default ProductManagement;
