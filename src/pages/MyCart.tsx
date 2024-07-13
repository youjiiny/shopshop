import { v4 as uuidv4 } from 'uuid';
import CartItem from 'components/CartItem';
import { useAuthContext } from 'context/AuthContext';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import { PriceCard } from 'components/PriceCard';
import { useCartQuery } from 'hooks/useCartQuery';
import { useNavigate } from 'react-router-dom';
import OrderProcess from 'components/OrderProcess';
import { AuthContextType } from 'types/auth';
import { Link } from 'react-router-dom';

const MyCart = () => {
  const { user } = useAuthContext() as AuthContextType;
  const navigate = useNavigate();
  const { isLoading, products } = useCartQuery();

  if (isLoading) return <p>Loading...</p>;
  if (!products?.length) {
    return (
      <>
        <OrderProcess />
        <div className='px-12 pt-12 pb-48'>
          <div className='pt-20 text-center  text-4xl border-t-4 md:border-b-2 border-black py-24'>
            <h3 className='text-lg md:text-3xl'>
              장바구니에 담은 상품이 없습니다.
            </h3>
            <div className='flex justify-center mt-10'>
              <Link
                to='/'
                className='flex flex-1 justify-center items-center max-w-60 md:max-w-[400px] h-14 border border-gray-500 text-lg md:text-2xl font-bold'
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  const totalPrice = products?.reduce(
    (acc, cur) => (acc += cur.price * cur.quantity),
    0,
  );
  const SHIPPING = totalPrice! < 70000 ? 3000 : 0;

  return (
    <>
      <OrderProcess />
      <div className='px-12 pt-12 pb-48'>
        <section>
          <div className='border border-t-2'></div>
          {!products?.length && <p>장바구니에 상품이 없습니다.</p>}
          <ul>
            {products?.map((product) => (
              <CartItem
                key={uuidv4()}
                product={product}
                uid={user?.uid as string}
              />
            ))}
          </ul>
        </section>
        <section className='flex justify-around items-center my-20 border-t-2 border-black'>
          <PriceCard text={'총 주문금액'} price={totalPrice!} />
          <BsFillPlusCircleFill size={25} />
          <PriceCard text={'배송비'} price={SHIPPING} />
          <FaEquals size={25} />
          <PriceCard text={'총 결제금액'} price={totalPrice! + SHIPPING} />
        </section>
        {products?.length && (
          <button
            className='w-full h-12 text-white text-xl hover:text-orange-700 font-semibold bg-light-brown rounded'
            onClick={() => navigate('/checkout')}
          >
            주문하기
          </button>
        )}
      </div>
    </>
  );
};

export default MyCart;
