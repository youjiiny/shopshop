import { useAuthContext } from 'context/AuthContext';
import { Link } from 'react-router-dom';
import { AuthContextType } from 'types/auth';

const SideBar = () => {
  const { user } = useAuthContext() as AuthContextType;

  return (
    <div className='w-56 h-60'>
      <div className='mb-10'>
        <h3 className='text-2xl'>{user?.displayName}</h3>
      </div>
      <h4 className='font-bold mb-2'>나의 쇼핑정보</h4>
      <ul className='text-sm text-light-gray mb-8'>
        <li>
          <Link to='/mypage/orders'>주문배송조회</Link>
        </li>
        <li>취소/교환/반품 내역</li>
      </ul>
      <h4 className='font-bold mb-2'>나의 계정 설정</h4>
      <ul className='text-sm text-light-gray'>
        <li>
          <Link to='/mypage/edit/info'>회원정보 수정</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
