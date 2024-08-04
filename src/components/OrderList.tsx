import { OrderList as OrderListType } from 'types/order';
import OrderCancelModal from './OrderCancelModal';
import { useModalStore } from 'store/modal';
import Modal from './Modal';
import ArrowSvg from 'assets/svg/ArrowSvg';
import { Link } from 'react-router-dom';

const OrderList = ({ order }: { order: OrderListType }) => {
  const { orderId, orderDate, products, payment, status } = order;
  const { openModal } = useModalStore();

  return (
    <li className='sm:border-t-2 border-black'>
      <div className='border-b-4 border-black py-4 sm:hidden'>
        <span className='font-bold'>{orderId}</span>
      </div>
      <div className='hidden sm:flex justify-between py-4 border-b'>
        <div className='flex gap-3'>
          <Link to={`/mypage/order/${orderId}`}>
            주문 일자 <b>{orderDate.toISOString().slice(0, 10)}</b>
          </Link>
          <Link to={`/mypage/order/${orderId}`}>
            주문 번호 <b>{orderId}</b>
          </Link>
        </div>
        {status === 'completed' && (
          <button
            className='flex items-center gap-1 text-gray-600'
            onClick={() => openModal(<OrderCancelModal orderId={orderId} />)}
          >
            주문 취소
            <ArrowSvg width={14} height={14} />
          </button>
        )}
      </div>
      <div>
        <ul className='sm:py-4 md:pt-8 pb-2'>
          {products.map((product, i) => {
            const { name, image, size, quantity, price } = product;
            return (
              <li
                key={i}
                className='flex flex-col my-2 sm:flex-row sm:items-center sm:mb-6 sm:border-none sm:my-0 last:my-0'
              >
                <div className='mb-4 sm:flex-1'>
                  <div className='inline-flex items-center p-1 mb-2 border rounded-sm bg-amber-100 sm:hidden'>
                    <span className='text-xs lg:text-xl font-bold'>
                      {status === 'completed' ? '구매완료' : '취소완료'}
                    </span>
                  </div>
                  <Link to={`/mypage/order/${orderId}`} className='flex'>
                    <div className='w-20 h-20 mr-5'>
                      <img
                        className='w-full h-full object-contain'
                        src={image}
                      />
                    </div>
                    <div>
                      <p className='font-bold'>{name}</p>
                      <p className='text-[13px] lg:text-base text-option'>
                        옵션:
                        {size}
                      </p>
                      <p className='text-[13px] mt-1 lg:text-base text-option'>{`${price.toLocaleString()}원 / 수량 ${quantity}개`}</p>
                    </div>
                  </Link>
                </div>

                <div className='hidden sm:flex items-center justify-center flex-1 h-full'>
                  <span className='text-sm lg:text-base'>
                    {payment.shipping
                      ? `${payment.shipping.toLocaleString()}원`
                      : '무료배송'}
                  </span>
                </div>
                <div className='hidden sm:flex items-center justify-center flex-1'>
                  <span className='text-lg lg:text-xl font-bold'>
                    {status === 'completed' ? '구매완료' : '취소완료'}
                  </span>
                </div>
                <div className='text-sm text-center p-3 border-y border-b-black sm:hidden'>
                  <span>배송비 : </span>{' '}
                  {payment.shipping
                    ? `${payment.shipping.toLocaleString()}원`
                    : '무료배송'}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Modal />
    </li>
  );
};

export default OrderList;
