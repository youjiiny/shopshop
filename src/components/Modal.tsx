import ModalCloseSvg from 'assets/svg/ModalCloseSvg';
import { createPortal } from 'react-dom';
import { useModalStore } from 'store/modal';

const Modal = () => {
  const { isOpen, content, closeModal } = useModalStore();
  if (!isOpen) return null;

  return createPortal(
    <div className='w-100 h-100 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='rounded-md min-w-80 absolute top-1/2 left-1/2 pt-12 px-10 pb-10 bg-white shadow-modal -translate-x-1/2 -translate-y-1/2 overflow-hidden'>
        <div className='w-80 h-auto flex flex-col items-center'>
          {content}
          <button
            className='w-10 absolute top-2 right-2 p-2'
            onClick={closeModal}
          >
            <ModalCloseSvg />
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement,
  );
};

export default Modal;
