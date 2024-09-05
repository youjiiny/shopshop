import { useNavigate } from 'react-router-dom';
import { useModalStore } from 'store/modal';

const LoginRequestModal = () => {
  const { closeModal } = useModalStore();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signin');
    closeModal();
  };
  return (
    <div className='flex flex-col gap-5 text-center leading-6'>
      <p className='text-lg break-keep whitespace-pre-wrap leading-6'>
        로그인이 필요합니다.
        <br /> 로그인 하시겠습니까?
      </p>

      <div className='flex gap-3 mt-3'>
        <button
          className='w-40 border border-gray-400 p-3'
          onClick={closeModal}
        >
          취소
        </button>
        <button
          className='w-40 border border-gray-400 p-3 bg-black text-white'
          onClick={handleClick}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default LoginRequestModal;
