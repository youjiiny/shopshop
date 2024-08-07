import OrderList from 'components/OrderList';
import { useOrderQuery } from 'hooks/useOrderQuery';

const OrderHistory = () => {
  const { isLoading, orders } = useOrderQuery();
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

export default OrderHistory;
