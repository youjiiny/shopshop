import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from 'context/AuthContext';
import { CartItemType } from 'types/product';
import { AuthContextType } from 'types/auth';

const PaymentInfo = () => {
  const { user } = useAuthContext() as AuthContextType;
  const queryClient = useQueryClient();
  const products: CartItemType[] | undefined = queryClient.getQueryData([
    'myCart',
    user?.uid as string,
  ]);
  const list = ['총 상품 금액', '배송비', '총 결제금액'];
  const totalPrice = products?.reduce((acc, cur) => (acc += cur.price), 0);
  const SHIPPING = totalPrice! >= 70000 ? 0 : 3000;
  const getPrice = (list: string) => {
    if (list === '총 상품 금액') {
      return totalPrice;
    }
    if (list === '배송비') {
      return SHIPPING;
    }
    if (list === '총 결제금액') {
      return (totalPrice as number) + SHIPPING;
    }
  };

  return (
    <section className='ml-8 border-[3px] border-black px-7 pb-10'>
      <header className='flex items-center h-12 border-b'>
        <h2 className='text-sm font-bold'>결제 금액</h2>
      </header>
      <div>
        <ul className='my-6'>
          {list.map((l, i) => (
            <li key={i} className='flex justify-between last:mt-4'>
              <span
                className={`text-sm text-secondary ${i === list.length - 1 ? 'font-bold' : ''}`}
              >
                {l}
              </span>
              <span
                className={`${i === list.length - 1 ? 'font-bold text-price-stress text-2xl' : ''}`}
              >{`${getPrice(l)?.toLocaleString()}원`}</span>
            </li>
          ))}
        </ul>
        <div className='pt-6'>
          <div>
            <span className='flex gap-1'>
              <input type='checkbox' id='order-check' name='order-check' />
              <label htmlFor='order-check'>
                주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.
              </label>
            </span>
          </div>
          <ul>
            <li className='flex gap-1'>
              <input
                type='checkbox'
                id='consent-collection'
                name='consent-collection'
              />
              <label htmlFor='consent-collection'>
                (필수) 개인정보 수집/이용 동의
              </label>
            </li>
            <li className='flex gap-1'>
              <input
                type='checkbox'
                id='consent-information'
                name='consent-information'
              />
              <label htmlFor='consent-information'>
                (필수) 개인정보 제3자 제공 동의
              </label>
            </li>
            <li className='flex gap-1'>
              <input
                type='checkbox'
                id='payment-service'
                name='payment-service'
              />
              <label htmlFor='payment-service'>
                (필수) 결제대행 서비스 이용약관
              </label>
            </li>
          </ul>
        </div>
        <div className='mt-7'>
          <button className='w-full h-16 bg-black text-2xl text-white font-semibold'>
            CHECK OUT
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentInfo;
