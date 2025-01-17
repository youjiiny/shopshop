import { GetProductType, LikedProductType } from 'types/product';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';
import { AuthContextType } from 'types/auth';
import HeartSvg from 'assets/svg/HeartSvg';
import { useModalStore } from 'store/modal';
import LoginRequestModal from './LoginRequestModal';
import { useProductLikeToggle } from 'hooks/useProductLikeToggle';

type Props = {
  product: GetProductType | LikedProductType;
};

const ProductCard = ({ product }: Props) => {
  const { id, name, mainImg, price, heartCount, isLiked } = product;
  const { user } = useAuthContext() as AuthContextType;
  const { mutate: toggleLikeMutate } = useProductLikeToggle(
    id,
    isLiked,
    user?.uid,
  );
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user?.uid) {
      openModal(<LoginRequestModal />);
      return;
    }
    toggleLikeMutate({ uid: user?.uid, productId: id });
  };

  return (
    <li className='cursor-pointer' onClick={() => navigate(`/products/${id}`)}>
      <div>
        <img
          src={`${import.meta.env.VITE_CLOUDFRONT_URL}/${id}/represent/${mainImg}?w=600&h=600`}
          alt='product image'
          width={300}
          height={300}
        />
      </div>
      <div className='mt-2 px-2'>
        <h3 className='truncate'>{name}</h3>
        <p className='font-semibold text-price'>{`${price.toLocaleString()}원`}</p>
        <button
          className='flex items-center'
          onClick={handleLike}
          disabled={user?.isAdmin}
          title={user?.isAdmin ? '좋아요는 일반 회원만 가능합니다.' : ''}
        >
          <HeartSvg isLiked={isLiked} />
          <p className='m-1'>{heartCount || 0}</p>
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
