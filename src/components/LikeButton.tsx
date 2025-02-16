import LoginRequestModal from './LoginRequestModal';
import HeartSvg from 'assets/svg/HeartSvg';
import { useAuthContext } from 'context/AuthContext';
import { useProductLikeToggle } from 'hooks/useProductLikeToggle';
import { useModalStore } from 'store/modal';
import { AuthContextType } from 'types/auth';

type Props = { isLiked: boolean; id: string; heartCount?: number };

const LikeButton = ({ isLiked, id, heartCount }: Props) => {
  const { user } = useAuthContext() as AuthContextType;
  const { mutate: toggleLikeMutate } = useProductLikeToggle(
    id,
    isLiked,
    user?.uid,
  );
  const { openModal } = useModalStore();
  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user?.uid) {
      openModal(<LoginRequestModal />);
      return;
    }
    toggleLikeMutate({ uid: user?.uid, productId: id });
  };

  return (
    <button
      className='flex items-center gap-1'
      onClick={handleLike}
      disabled={user?.isAdmin}
      title={user?.isAdmin ? '좋아요는 일반 회원만 가능합니다.' : ''}
    >
      <HeartSvg
        className={`w-6 h-6 ${isLiked ? 'fill-red-500' : 'fill-none'}`}
      />
      {heartCount && <p className='text-sm'>{heartCount}</p>}
    </button>
  );
};
export default LikeButton;
