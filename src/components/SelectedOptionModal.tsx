import ModalCloseSvg from 'assets/svg/ModalCloseSvg';
import { useModalStore } from 'store/modal';

const SelectedOptionModal = () => {
  const { toggleModal } = useModalStore();

  return (
    <div className='flex flex-col gap-5 text-lg text-center leading-6'>
      <p>이미 선택된 옵션입니다.</p>
      <button className='border border-gray-400 p-3' onClick={toggleModal}>
        확인
      </button>
      <button className='w-10 absolute top-2 right-2 p-2' onClick={toggleModal}>
        <ModalCloseSvg />
      </button>
    </div>
  );
};

export default SelectedOptionModal;
