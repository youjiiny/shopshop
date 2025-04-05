import OrderProcess from 'components/OrderProcess';
import OrderProducts from 'components/OrderProducts';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { CartItemType } from 'types/product';
import MetaTag from 'components/MetaTag';

const OrderConfirm = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const products = state as CartItemType[];
  const navigate = useNavigate();

  useEffect(() => {
    if (!products) {
      navigate('/');
    }
  }, []);
  if (!products) {
    return null;
  }

  return (
    <>
      <MetaTag title='주문 완료 - Shopshop' />
      <div className='px-12 pt-12 pb-48'>
        <OrderProcess />
        <div className='w-full flex flex-col border-4 border-black mb-12'>
          <div className='pb-16'>
            <h2 className='text-2xl md:text-4xl p-7 font-bold'>
              주문이 완료되었습니다.
            </h2>
          </div>
          <p className='h-14 flex items-center gap-2 text-sm md:text-lg border-t-2 border-black pl-8'>
            주문번호
            <strong className='text-price-stress'>{id}</strong>
          </p>
        </div>
        <OrderProducts products={products} />
        <div className='flex justify-center items-center gap-3 mt-20'>
          <Link
            to='/'
            className='text-lg md:text-2xl border border-slate-400 p-5 md:px-10 md:py-5 font-semibold'
          >
            계속 쇼핑하기
          </Link>
          <Link
            to='/mypage'
            className='text-lg md:text-2xl border p-5 md:px-10 md:py-5 bg-black text-white font-semibold'
          >
            주문/배송조회
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderConfirm;
