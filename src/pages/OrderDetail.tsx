import { DefaultError, useQuery } from '@tanstack/react-query';
import { getOrderDetail } from 'api/order';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import OrderList from 'components/OrderList';
import { useAuthContext } from 'context/AuthContext';
import { useParams } from 'react-router-dom';
import { Address, AuthContextType } from 'types/auth';
import { OrderList as OrderListType } from 'types/order';

const OrderDetail = () => {
  const { id } = useParams();
  const { user } = useAuthContext() as AuthContextType;
  const {
    isLoading,
    data: order,
    error,
  } = useQuery<
    OrderListType,
    DefaultError,
    OrderListType,
    [string, string, string, string]
  >({
    queryKey: ['mypage', user?.uid as string, 'order', id as string],
    queryFn: getOrderDetail,
  });
  if (isLoading) return <p>Loading...</p>;
  console.log('order', order);
  // const{buyer,payment} = order;
  return (
    <section className='flex flex-col gap-20'>
      <section>
        <h4 className='text-2xl text-center sm:text-2xl sm:text-left leading-normal mb-2'>
          주문상품정보
        </h4>
        <section className='hidden mt-2 sm:flex border-t-4 border-black'>
          <div className='flex-1 text-center font-bold p-5'>상품정보</div>
          <div className='flex-1 text-center font-bold p-5'>배송비</div>
          <div className='flex-1 text-center font-bold p-5'>진행상태</div>
        </section>
        <ol className='border-black sm:last:border-b'>
          <OrderList order={order as OrderListType} />
        </ol>
      </section>
      <section>
        <h4 className='text-2xl leading-normal mb-2'>구매자정보</h4>

        <table className='w-full table-fixed text-left border-t-4 border-black'>
          <tbody>
            <tr className='border-b md:border-none'>
              <th className='md:border md:border-l-0 font-normal px-2 py-3'>
                주문자
              </th>
              <td className='md:border md:border-r-0 px-3 py-1 font-bold'>
                {order?.buyer.name}
              </td>
            </tr>
            <tr className='border-b md:border-none'>
              <th className='md:border md:border-l-0 font-normal px-2 py-3'>
                연락처
              </th>
              <td className='md:border px-3 py-1 font-bold'>
                {order?.buyer.phone}
              </td>
              <th className='hidden md:table-cell border font-normal px-2 py-3'>
                연락처2
              </th>
              <td className='hidden md:table-cell border border-r-0 px-3 py-1 font-bold'>
                {order?.buyer.phone2 ? order.buyer.phone2 : '-'}
              </td>
            </tr>
            <tr className='border-b md:hidden'>
              <th className='md:border font-normal px-2 py-3'>연락처2</th>
              <td className='md:border md:border-r-0 px-3 py-1 font-bold'>
                {order?.buyer.phone2 ? order.buyer.phone2 : '-'}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <div className='border-b-4 border-black'>
          <h4 className='text-2xl mb-2 leading-normal'>결제정보</h4>
        </div>
        <div className='flex flex-col gap-2 h-auto py-4 md:flex-row md:h-20 md:py-0 md:gap-0 font-semibold border-b'>
          <div className='flex items-center justify-between text-sm md:px-5 md:basis-[30%]'>
            주문금액{' '}
            <span className='lg:text-lg'>{`${order?.payment.price.toLocaleString()}원`}</span>
          </div>
          <BsFillPlusCircleFill size={24} className='hidden md:block my-auto' />
          <div className=' flex items-center justify-between text-sm md:px-5 md:basis-[30%]'>
            배송비{' '}
            <span className='lg:text-lg'>{`${order?.payment.shipping.toLocaleString()}원`}</span>
          </div>
          <FaEquals size={24} className='hidden md:block my-auto' />
          <div className='flex items-center justify-between text-sm md:px-5 lg:text-lg text-price-stress md:basis-2/5'>
            결제금액{' '}
            <span className='text-base lg:text-xl font-bold'>{`${order?.payment.total.toLocaleString()}원`}</span>
          </div>
        </div>
      </section>
      <section>
        <h4 className='text-2xl mb-2 leading-normal'>배송지정보</h4>
        <table className='w-full table-fixed text-left border-t-4 border-black '>
          <colgroup>
            <col width={140} />
            <col />
            <col width={140} />
            <col />
          </colgroup>
          <tbody>
            <tr className='border-b md:border-none'>
              <th
                className='md:border md:border-l-0 font-normal px-2 py-3'
                scope='row'
              >
                받는사람
              </th>
              <td
                className='md:border md:border-r-0 px-3 py-1 font-bold'
                colSpan={8}
              >
                {order?.buyer.name}
              </td>
            </tr>
            <tr className='border-b md:border-none'>
              <th
                className='md:border md:border-l-0 font-normal px-2 py-3'
                scope='row'
              >
                연락처
              </th>
              <td className='md:border px-3 py-1 font-bold' colSpan={3}>
                {order?.buyer.phone}
              </td>
              <th
                className='hidden md:table-cell border font-normal px-2 py-3'
                scope='row'
              >
                연락처2
              </th>
              <td
                className='hidden md:table-cell border border-r-0 px-3 py-1 font-bold'
                colSpan={3}
              >
                {order?.buyer.phone2 ? order.buyer.phone2 : '-'}
              </td>
            </tr>
            <tr className='border-b md:hidden'>
              <th className='md:border font-normal px-2 py-3' scope='row'>
                연락처2
              </th>
              <td className='md:border md:border-r-0 px-3 py-1 font-bold'>
                {order?.buyer.phone2 ? order.buyer.phone2 : '-'}
              </td>
            </tr>
            <tr className='border-b md:border-none'>
              <th
                className='md:border md:border-l-0 font-normal px-2 py-3'
                scope='row'
              >
                주소
              </th>
              <td
                className='md:border md:border-r-0 px-3 py-1 font-bold'
                colSpan={8}
              >
                {order?.buyer.address.roadAddress}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default OrderDetail;
