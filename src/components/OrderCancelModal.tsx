import { handleRefund } from 'lib/payment';
import { useModalStore } from 'store/modal';

const OrderCancelModal = ({ orderId }: { orderId: string }) => {
  const { closeModal } = useModalStore();
  const handleCancelPay = async () => {
    const { isSuccess, message } = await handleRefund(orderId);
    if (isSuccess) {
      alert('환불 취소!');
    } else {
      alert(message);
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
