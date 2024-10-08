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
  const { id, name, mainImg, subImg, image, price, heartCount } = product;
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
          className='w-96 h-96 md:w-72 md:h-72'
          src={
            mainImg
              ? `${import.meta.env.VITE_S3_SHOPSHOP_PRODUCT_URL}/${id}/represent/${mainImg}`
              : image
          }
          alt='product image'
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
