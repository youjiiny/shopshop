import { useModalStore } from 'store/modal';

type Props = {
  missing: 'name' | 'address' | 'phone' | 'checkbox';
};

const MissingInfoModal = ({ missing }: Props) => {
  const { closeModal } = useModalStore();
  const getMessage = (missing: 'name' | 'address' | 'phone' | 'checkbox') => {
    switch (missing) {
      case 'name':
        return '받는 사람 이름이 입력되지 않았습니다.';
      case 'address':
        return '우편번호가 입력되지 않았습니다.';
      case 'phone':
        return '배송지의 연락처를 확인해주세요.';
      case 'checkbox':
        return (
          <>
            결제를 위해 필수사항에 <br />
            모두 동의해주세요.
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div className='flex flex-col gap-5 text-center'>
      <p className='text-lg break-keep whitespace-pre-wrap leading-6'>
        {getMessage(missing)}
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

export default MissingInfoModal;
