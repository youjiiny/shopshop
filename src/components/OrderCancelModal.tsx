import { useModalStore } from 'store/modal';

const OrderCancelModal = ({ orderId }: { orderId: string }) => {
  const { closeModal } = useModalStore();
  const handleCancelPay = async () => {
    const url = import.meta.env.VITE_PORTONE_REFUND_URL;
    try {
      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ merchant_uid: orderId }),
      });
      const result = await response.json();
      console.log('result', result);
    } catch (error) {
      console.error('Error processing refund:', error);
      alert('환불 처리 중 오류가 발생했습니다.');
    }
    closeModal();
  };
  return (
    <div className='flex flex-col gap-5 text-center leading-6'>
      <p className='text-xl'>주문을 취소하시겠습니까?</p>
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
    </div>
  );
};

export default OrderCancelModal;
