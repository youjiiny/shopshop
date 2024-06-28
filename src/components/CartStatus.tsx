import { useCartQuery } from 'hooks/useCartQuery';
import { BsCart3 } from 'react-icons/bs';

const CartStatus = () => {
  const { products } = useCartQuery();

  return (
    <div className='relative inline-block'>
      <BsCart3 className='text-2xl mt-1 overflow-hidden' />
      {products && products?.length > 0 && (
        <p className='w-4 h-4 text-xs absolute left-2.5 -top-0.5 text-center text-white font-semibold bg-price-stress rounded-xl'>
          {products?.length}
        </p>
      )}
    </div>
  );
};

export default CartStatus;
