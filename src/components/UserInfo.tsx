import { useAuthContext } from 'context/AuthContext';
import { useState } from 'react';
import { AuthContextType } from 'types/auth';

const UserInfo = () => {
  const { user, updateUser } = useAuthContext() as AuthContextType;
  const [userName, setUserName] = useState<string>(
    user?.displayName ? user.displayName : '',
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleSave = () => {
    if (!userName.trim()) return;
    if (userName === (user?.displayName as string)) return;
    updateUser({ displayName: userName });
  };

  return (
    <div className='max-w-96'>
      <h4 className='text-sm text-[#303033]'>회원 정보</h4>
      <div className='py-5'>
        <div className='flex items-center gap-6 mb-4'>
          <p className='text-sm text-[#303033]'>성명</p>
          <input
            className='px-3 h-8'
            type='text'
            defaultValue={userName}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <button
            className='w-full h-12 border bg-primary text-white'
            onClick={handleSave}
          >
            회원정보 수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
