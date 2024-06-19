import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { getMyCart } from 'api/cart';
import CartItem from 'components/CartItem';
import { useAuthContext } from 'context/AuthContext';
import type { CartItemType } from 'types/product';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import { PriceCard } from 'components/PriceCard';

const MyCart = () => {
  const user = useAuthContext();
  const { isLoading, data: products } = useQuery<CartItemType[]>({
    queryKey: ['myCart', user?.uid],
    queryFn: () => getMyCart(user!.uid),
  });

  if (isLoading) return <p>Loading...</p>;
  const totalPrice = products?.reduce(
    (acc, cur) => (acc += cur.price * cur.quantity),
    0,
  );
  const SHIPPING = totalPrice! < 70000 ? 3000 : 0;

  return (
    <div className='px-12 pt-12 pb-48'>
      <section>
        <div className='border border-t-2'></div>
        {!products?.length && <p>장바구니에 상품이 없습니다.</p>}
        <ul>
          {products?.map((product) => (
            <CartItem key={uuidv4()} product={product} uid={user!.uid} />
          ))}
        </ul>
      </section>
      <section className='flex justify-around items-center my-20 border-t-2 border-black'>
        <PriceCard text={'총 주문금액'} price={totalPrice!} />
        <BsFillPlusCircleFill size={20} />
        <PriceCard text={'배송비'} price={SHIPPING} />
        <FaEquals size={20} />
        <PriceCard text={'총 결제금액'} price={totalPrice! + SHIPPING} />
      </section>
      <button className='w-full h-12 text-white text-xl hover:text-orange-700 font-semibold bg-light-brown rounded'>
        주문하기
      </button>
    </div>
  );
};

export default MyCart;
