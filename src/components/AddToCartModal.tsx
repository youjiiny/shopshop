import ModalCloseSvg from 'assets/svg/ModalCloseSvg';
import { Link } from 'react-router-dom';
import { useModalStore } from 'store/modal';

const AddToCartModal = () => {
  const { toggleModal } = useModalStore();
  const handleClick = () => {
    toggleModal();
  };
  return (
    <div className='flex flex-col gap-5 text-lg text-center leading-6'>
      <p>장바구니에 상품이 담겼습니다.</p>
      <Link
        className='border border-gray-400 p-3'
        to={'/carts'}
        onClick={handleClick}
      >
        장바구니 바로 가기
      </Link>
      <button className='w-10 absolute top-2 right-2 p-2' onClick={toggleModal}>
        <ModalCloseSvg />
      </button>
    </div>
  );
};

export default AddToCartModal;
