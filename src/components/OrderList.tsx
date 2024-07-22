import { OrderList as OrderListType } from 'types/order';

const OrderList = ({ order }: { order: OrderListType }) => {
  const { orderId, orderDate, products, payment } = order;
  return (
    <li className='border-t-2 border-black'>
      <div className='flex gap-3 py-4 border-b'>
        <p>
          주문 일자 <b>{orderDate.toISOString().slice(0, 10)}</b>
        </p>
        <p>
          주문 번호 <b>{orderId}</b>
        </p>
      </div>
      <div>
        <ul className='py-8'>
          {products.map((product, i) => {
            const { name, image, size, quantity, price } = product;
            return (
              <li key={i} className='flex items-center mb-6'>
                <div className='flex-1'>
                  <div className='flex'>
                    <div className='w-20 h-20 mr-5'>
                      <img
                        className='w-full h-full object-contain'
                        src={image}
                      />
                    </div>
                    <div>
                      <p className='font-bold'>{name}</p>
                      <p>
                        옵션:
                        {size}
                      </p>
                      <p>{`${price.toLocaleString()}원 / 수량 ${quantity}개`}</p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-center flex-1 h-full'>
                  <span>
                    {payment.shipping
                      ? `${payment.shipping.toLocaleString()}원`
                      : '무료배송'}
                  </span>
                </div>
                <div className='flex items-center justify-center flex-1'>
                  <span className='text-xl font-bold'>구매완료</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default OrderList;
