import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from 'context/AuthContext';
import { CartItemType } from 'types/product';
import { AuthContextType, Receiver, Address } from 'types/auth';
import { useState } from 'react';
import { handlePayment } from 'lib/payment';
import { PHONE_REGEX } from 'utils/checkEffectiveness';
import { useModalStore } from 'store/modal';
import Modal from './Modal';
import MissingInfoModal from './MissingInfoModal';
import PaymentErrorModal from './PaymentErrorModal';
import { useCartQuery } from 'hooks/useCartQuery';
import { saveOrder } from 'api/order';
import { useNavigate } from 'react-router-dom';

type Props = { receiver: Receiver; address: Address };

const PaymentInfo = ({ receiver, address }: Props) => {
  const { user } = useAuthContext() as AuthContextType;
  const { openModal } = useModalStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { deleteFromCartMutate } = useCartQuery();
  const products: CartItemType[] | undefined = queryClient.getQueryData([
    'myCart',
    user?.uid as string,
  ]);
  const [checkedList, setCheckedList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [checked, setChecked] = useState<boolean>(false);
  const list = ['총 상품 금액', '배송비', '총 결제금액'];
  const totalPrice = products?.reduce(
    (acc, cur) => (acc += cur.price * cur.quantity),
    0,
  );
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
  const handlePay = async () => {
    if (!receiver.name) {
      openModal(<MissingInfoModal missing='name' />);
      return;
    }
    if (!address.zoneCode && !address.roadAddress) {
      openModal(<MissingInfoModal missing='address' />);
      return;
    }
    const phone = `${receiver.phone1.part1}-${receiver.phone1.part2}-${receiver.phone1.part3}`;
    if (!PHONE_REGEX.test(phone)) {
      console.log('address', address);
      openModal(<MissingInfoModal missing='phone' />);
      return;
    }
    if (!checkedList.every((checked) => checked)) {
      openModal(<MissingInfoModal missing='checkbox' />);
      return;
    }

    const { isSuccess, message, merchant_uid } = await handlePayment({
      name: receiver.name as string,
      address: address as Address,
      phone,
    });
    if (isSuccess) {
      try {
        deleteFromCartMutate({ uid: user?.uid as string });
        const orderId = await saveOrder({
          uid: user?.uid as string,
          merchant_uid: merchant_uid as string,
          products: products as CartItemType[],
          receiver,
          address,
          price: totalPrice!,
        });
        if (orderId) {
          navigate(`/order/${orderId}`, { state: products });
        }
      } catch (err) {
        console.error('error', err);
      }
    } else {
      openModal(<PaymentErrorModal message={message} />);
    }
  };
  const handleCheckAll = () => {
    if (!checked) {
      setCheckedList((checkedList) => checkedList.map((c) => true));
    } else {
      setCheckedList((checkedList) => checkedList.map((c) => false));
    }
    setChecked((prev) => !prev);
  };
  const handleCheck = (index: number) => {
    const checked = checkedList[index];
    const shallow = [...checkedList];
    shallow[index] = !checked;
    const isRequiredChecked = shallow[1] && shallow[2] && shallow[3];
    if (isRequiredChecked) {
      shallow[0] = true;
      setChecked(true);
    } else {
      shallow[0] = false;
      setChecked(false);
    }
    setCheckedList(shallow);
  };

  return (
    <section className='border-[3px] border-black px-7 pb-10 lg:ml-8'>
      <header className='flex items-center h-12 border-b'>
        <h2 className='text-sm font-bold'>결제 금액</h2>
      </header>
      <div>
        <ul className='my-6'>
          {list.map((l, i) => (
            <li key={i} className='flex justify-between last:mt-4'>
              <span
                className={`text-secondary ${l === '총 결제금액' ? 'text-lg font-bold' : 'text-sm'}`}
              >
                {l}
              </span>
              <span
                className={`${i === list.length - 1 ? 'text-xl font-bold text-price-stress md:text-3xl' : ''}`}
              >{`${getPrice(l)?.toLocaleString()}원`}</span>
            </li>
          ))}
        </ul>
        <div className='pt-6 border-t'>
          <div>
            <span className='flex items-center gap-1'>
              <input
                type='checkbox'
                id='order-check'
                name='order-check'
                className='w-4 h-4 md:w-5 md:h-5'
                onChange={handleCheckAll}
                checked={checkedList[0]}
              />
              <label
                htmlFor='order-check'
                className='text-sm basis-11/12 md:text-base p-1'
              >
                주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.
              </label>
            </span>
          </div>
          <ul>
            <li className='flex items-center gap-1'>
              <input
                type='checkbox'
                id='consent-collection'
                name='consent-collection'
                className='w-4 h-4 md:w-5 md:h-5'
                onChange={() => handleCheck(1)}
                checked={checkedList[1]}
              />
              <label
                htmlFor='consent-collection'
                className='text-sm text-label p-1'
              >
                <strong>(필수) </strong>개인정보 수집/이용 동의
              </label>
            </li>
            <li className='flex items-center gap-1'>
              <input
                type='checkbox'
                id='consent-information'
                name='consent-information'
                className='w-4 h-4 md:w-5 md:h-5'
                onChange={() => handleCheck(2)}
                checked={checkedList[2]}
              />
              <label
                htmlFor='consent-information'
                className='text-sm text-label p-1'
              >
                <strong>(필수)</strong> 개인정보 제3자 제공 동의
              </label>
            </li>
            <li className='flex items-center gap-1'>
              <input
                type='checkbox'
                id='payment-service'
                name='payment-service'
                className='w-4 h-4 md:w-5 md:h-5'
                onChange={() => handleCheck(3)}
                checked={checkedList[3]}
              />
              <label
                htmlFor='payment-service'
                className='text-sm text-label p-1'
              >
                <strong>(필수)</strong> 결제대행 서비스 이용약관
              </label>
            </li>
          </ul>
        </div>
        <div className='mt-7'>
          <button
            className='w-full h-16 bg-black text-xl md:text-[26px] text-white font-semibold hover:text-price-stress'
            onClick={handlePay}
          >
            CHECK OUT
          </button>
        </div>
      </div>
      <Modal />
    </section>
  );
};

export default PaymentInfo;
