import { useModalStore } from 'store/modal';

const ConfirmContactModal = () => {
  const { closeModal } = useModalStore();

  return (
    <div className='flex flex-col gap-5 text-center leading-6'>
      <p className='text-xl'>배송지의 연락처를 확인해주세요.</p>
      <div className='mt-4'>
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

export default ConfirmContactModal;
