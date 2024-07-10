import { useModalStore } from 'store/modal';

const PaymentErrorModal = ({ message }: { message: string }) => {
  const { closeModal } = useModalStore();
  return (
    <div className='flex flex-col gap-5 text-center'>
      <p className='text-lg break-keep whitespace-pre-wrap leading-6'>
        {message}
      </p>
      <div className='mt-3'>
        <button
          className='w-40 border border-gray-400 p-3'
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PaymentErrorModal;
