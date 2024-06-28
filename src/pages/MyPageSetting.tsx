import ShippingAddressForm from 'components/ShippingAddressForm';
import { useAuthContext } from 'context/AuthContext';

const MyPageSetting = () => {
  const user = useAuthContext();

  return (
    <div className='w-full'>
      <section>
        <h3 className='text-xl mb-5 pb-4 border-b-4 border-slate-800'>
          회원정보 수정
        </h3>
        {user?.email && (
          <div className='text-sm mb-10'>
            <p className='text-[#303030]'>아이디 (이메일)</p>
            <p>{user?.email}</p>
          </div>
        )}
        <ShippingAddressForm />
      </section>
    </div>
  );
};

export default MyPageSetting;
