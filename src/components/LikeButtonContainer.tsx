import { useAuthContext } from 'context/AuthContext';
import { useProductLikeToggle } from 'hooks/useProductLikeToggle';
import { AuthContextType } from 'types/auth';
import { useModalStore } from 'store/modal';
import LoginRequestModal from './LoginRequestModal';
import LikeButton from './LikeButton';

type Props = { isLiked: boolean; id: string; heartCount?: number };

const LikeButtonContainer = ({ isLiked, id, heartCount }: Props) => {
  const { user } = useAuthContext() as AuthContextType;
  const { openModal } = useModalStore();
  const { mutate: toggleLikeMutate } = useProductLikeToggle(
    id,
    isLiked,
    user?.uid,
  );
  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user?.uid) {
      openModal(<LoginRequestModal />);
      return;
    }
    toggleLikeMutate({ uid: user?.uid, productId: id });
  };

  return (
    <LikeButton
      isLiked={isLiked}
      heartCount={heartCount}
      onLike={handleLike}
      disabled={user?.isAdmin ?? false}
    />
  );
};

export default LikeButtonContainer;
