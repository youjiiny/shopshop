import { GetProductType } from 'types/product';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';
import { AuthContextType } from 'types/auth';
import HeartSvg from 'assets/svg/HeartSvg';
import { useModalStore } from 'store/modal';
import LoginRequestModal from './LoginRequestModal';
import { useLike } from 'hooks/useLike';

type Props = { product: GetProductType; likedProducts: string[] };

const ProductCard = ({ product, likedProducts }: Props) => {
  const { id, name, mainImg, price, heartCount } = product;
  const { user } = useAuthContext() as AuthContextType;
  const [isLiked, handleLikeMutate] = useLike({
    uid: user?.uid as string,
    liked: likedProducts,
    productId: id,
  });
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user?.uid) {
      openModal(<LoginRequestModal />);
      return;
    }
    handleLikeMutate();
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
