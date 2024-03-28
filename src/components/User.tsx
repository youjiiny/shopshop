import { User as FirebaseUser } from 'firebase/auth';

const User = ({ user }: { user: FirebaseUser }) => {
  const { photoURL } = user;
  return (
    <div>
      <img
        className='w-9 h-9 rounded-full'
        src={photoURL ? photoURL : import.meta.env.VITE_PROFILE_DEFAULT_IMG}
        alt={'프로필'}
      />
    </div>
  );
};

export default User;
