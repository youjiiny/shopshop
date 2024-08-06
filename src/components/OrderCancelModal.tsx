import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrder } from 'api/order';
import { useAuthContext } from 'context/AuthContext';
import { handleRefund } from 'lib/payment';
import { useState } from 'react';
import { useModalStore } from 'store/modal';
import { AuthContextType } from 'types/auth';
import { OrderList } from 'types/order';

const OrderCancelModal = ({ orderId }: { orderId: string }) => {
  const { user } = useAuthContext() as AuthContextType;
  const { closeModal } = useModalStore();
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  const cancelOrder = useMutation({
    mutationFn: updateOrder,
    onSuccess: async () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if ((queryKey[0] === 'mypage', queryKey[2] === 'orders')) {
          const value: OrderList[] | undefined =
            queryClient.getQueryData(queryKey);
          if (value) {
            const order = value.find((v) => v.orderId === orderId);
            if (order) {
              const index = value.findIndex((v) => v.orderId === orderId);
              const shallow = [...value];
              shallow[index] = {
                ...shallow[index],
                status: 'cancelled',
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
  });
  const handleCancelPay = async () => {
    const { isSuccess, message } = await handleRefund(orderId);
    setMessage(message);
    if (isSuccess) {
      cancelOrder.mutate({ uid: user?.uid as string, orderId });
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
