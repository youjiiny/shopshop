import { DefaultError, useQuery } from '@tanstack/react-query';
import { getCancelOrders } from 'api/order';
import OrderList from 'components/OrderList';
import { useAuthContext } from 'context/AuthContext';
import { AuthContextType } from 'types/auth';
import { OrderList as OrderListType } from 'types/order';

const CancelOrderHistory = () => {
  const { user } = useAuthContext() as AuthContextType;
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery<
    OrderListType[],
    DefaultError,
    OrderListType[],
    [string, string, string, string]
  >({
    queryKey: ['mypage', user?.uid as string, 'orders', 'cancelled'],
    queryFn: getCancelOrders,
  });
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='w-full'>
      <h4 className='text-xl text-center sm:text-2xl sm:text-left leading-normal'>
        주문배송조회
      </h4>
      <section className='hidden mt-2 sm:flex border-t-4 border-black'>
        <div className='flex-1 text-center font-bold p-5'>상품정보</div>
        <div className='flex-1 text-center font-bold p-5'>배송비</div>
        <div className='flex-1 text-center font-bold p-5'>진행상태</div>
      </section>
      <ol className='border-black sm:last:border-b'>
        {orders?.map((order) => (
          <OrderList key={order.orderId} order={order} />
        ))}
      </ol>
    </div>
  );
};

export default CancelOrderHistory;
