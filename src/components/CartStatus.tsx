import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyCart } from 'api/cart';
import { useAuthContext } from 'context/AuthContext';
import { BsCart3 } from 'react-icons/bs';

const CartStatus = () => {
  const user = useAuthContext();
  const { data: products } = useQuery({
    queryKey: ['myCart', user?.uid],
    queryFn: () => getMyCart(user!.uid),
  });

  return (
    <div className='relative inline-block'>
      <BsCart3 className='text-2xl mt-1 overflow-hidden' />
      <p className='w-4 h-4 text-xs absolute left-2.5 -top-0.5 text-center text-white font-semibold bg-price-stress rounded-xl'>
        {products?.length}
      </p>
    </div>
  );
};

export default CartStatus;
