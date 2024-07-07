import { Link } from 'react-router-dom';
import { useModalStore } from 'store/modal';

const AddToCartModal = () => {
  const { closeModal } = useModalStore();

  return (
    <div className='flex flex-col gap-5 text-center leading-6'>
      <p className='text-xl'>장바구니에 상품이 담겼습니다.</p>
      <div className='mt-4'>
        <Link
          className='w-40 border border-gray-400 p-3'
          to={'/carts'}
          onClick={closeModal}
        >
          장바구니 바로 가기
        </Link>
      </div>
    </div>
  );
};

export default AddToCartModal;
