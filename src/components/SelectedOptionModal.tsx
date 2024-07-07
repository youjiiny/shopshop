import { useModalStore } from 'store/modal';

const SelectedOptionModal = () => {
  const { closeModal } = useModalStore();

  return (
    <div className='flex flex-col gap-5 text-center leading-6'>
      <p className='text-xl'>이미 선택된 옵션입니다.</p>
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

export default SelectedOptionModal;
