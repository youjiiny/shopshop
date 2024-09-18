import { useAuthContext } from 'context/AuthContext';
import { NavLink } from 'react-router-dom';
import { AuthContextType } from 'types/auth';

const SideBar = () => {
  const { user } = useAuthContext() as AuthContextType;
  const setActiveLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'font-bold' : 'font-normal';

  return (
    <div className='w-40 lg:w-52'>
      <div className='mb-10'>
        <h3 className='text-2xl'>{user?.displayName}</h3>
      </div>
      {user?.isAdmin ? (
        <>
          <h4 className='font-bold mb-2'>운영관리</h4>
          <ul className='text-sm text-light-gray mb-8'>
            <li className='py-1'>
              <NavLink to='/admin/product' className={setActiveLinkStyle}>
                상품관리
              </NavLink>
            </li>
          </ul>
          <h4 className='font-bold mb-2'>나의 계정 설정</h4>
          <ul className='text-sm text-light-gray'>
            <li className='py-1'>
              <NavLink to='/mypage/edit/info' className={setActiveLinkStyle}>
                회원정보 수정
              </NavLink>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h4 className='font-bold mb-2'>나의 쇼핑정보</h4>
          <ul className='text-sm text-light-gray mb-8'>
            <li className='py-1'>
              <NavLink to='/mypage' className={setActiveLinkStyle} end>
                찜한 상품들
              </NavLink>
            </li>
            <li className='py-1'>
              <NavLink to='/mypage/orders' className={setActiveLinkStyle}>
                주문배송조회
              </NavLink>
            </li>
            <li className='py-1'>
              <NavLink
                to='/mypage/cancel-orders'
                className={setActiveLinkStyle}
              >
                취소/교환/반품 내역
              </NavLink>
            </li>
          </ul>
          <h4 className='font-bold mb-2'>나의 계정 설정</h4>
          <ul className='text-sm text-light-gray'>
            <li>
              <NavLink to='/mypage/edit/info' className={setActiveLinkStyle}>
                회원정보 수정
              </NavLink>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default SideBar;
