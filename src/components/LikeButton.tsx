import HeartSvg from 'assets/svg/HeartSvg';

type Props = {
  isLiked: boolean;
  heartCount?: number;
  onLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
};

const LikeButton = ({ isLiked, heartCount, onLike, disabled }: Props) => {
  return (
    <button
      className='flex items-center gap-1'
      onClick={onLike}
      disabled={disabled}
      title={disabled ? '좋아요는 일반 회원만 가능합니다.' : ''}
    >
      <HeartSvg
        className={`w-6 h-6 ${isLiked ? 'fill-red-500' : 'fill-none'}`}
      />
      {heartCount && <p className='text-sm'>{heartCount}</p>}
    </button>
  );
};
export default LikeButton;
