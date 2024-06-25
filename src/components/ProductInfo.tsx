import { useAuthContext } from 'context/AuthContext';
import { useCartQuery } from 'hooks/useCartQuery';

const ProductInfo = () => {
  const user = useAuthContext();
  const { products } = useCartQuery();

  return (
    <section className='relative border-t-2 border-black'>
      <header className='flex items-center border-b h-16'>
        <h2 className='text-lg font-bold'>{`상품 정보 / 총 ${products?.length}개`}</h2>
      </header>
      <ul className='my-6'>
        {products?.map((product) => {
          const { id, name, image, size, price, quantity } = product;
          return (
            <li key={id} className='w-full mt-7'>
              <div className='w-full flex items-center'>
                <div className='mr-5'>
                  <img
                    className='w-24 h-24 md:w-40 md:h-40 rounded-lg object-fit cursor-pointer'
                    src={image}
                    alt={'상품 이미지'}
                  />
                </div>
                <div className='w-1/2 flex flex-col'>
                  <div>
                    <p className='font-bold'>{name}</p>
                    <p className='text-sm text-light-black'>옵션:{size}</p>
                  </div>
                  <div>
                    <span className='text-sm text-light-black'>{`${price.toLocaleString()}원 / 수량 ${quantity}개`}</span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className='w-full h-[1px] bg-black'></div>
    </section>
  );
};

export default ProductInfo;
