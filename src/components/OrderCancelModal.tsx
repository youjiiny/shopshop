import { useAuthContext } from 'context/AuthContext';
import { useOrderQuery } from 'hooks/useOrderQuery';
import { handleRefund } from 'lib/payment';
import { useState } from 'react';
import { useModalStore } from 'store/modal';
import { AuthContextType } from 'types/auth';

const OrderCancelModal = ({ orderId }: { orderId: string }) => {
  const { user } = useAuthContext() as AuthContextType;
  const { closeModal } = useModalStore();
  const [message, setMessage] = useState('');
  const { cancelOrderMutate } = useOrderQuery();

  const handleCancelPay = async () => {
    const { isSuccess, message } = await handleRefund(orderId);
    setMessage(message);
    if (isSuccess) {
      cancelOrderMutate({ uid: user?.uid as string, orderId });
    }
  };

  return (
    <div className='flex flex-col gap-5 text-center leading-6'>
      <p className='text-lg break-keep whitespace-pre-wrap leading-6'>
        {message ? message : '주문을 취소하시겠습니까?'}
      </p>
      {message ? (
        <div className='mt-3'>
          <button
            className='w-40 border border-gray-400 p-3'
            onClick={closeModal}
          >
            확인
          </button>
        </div>
      ) : (
        <div className='flex gap-3 mt-3'>
          <button
            className='w-40 border border-gray-400 p-3'
            onClick={closeModal}
          >
            아니오
          </button>
          <button
            className='w-40 border border-gray-400 p-3 bg-black text-white'
            onClick={handleCancelPay}
          >
            예
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCancelModal;
