import { GetProductType } from 'types/product';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';
import { AuthContextType } from 'types/auth';
import { useEffect, useState } from 'react';
import HeartSvg from 'assets/svg/HeartSvg';
import { useLikeProductQuery } from 'hooks/useLikeProductQuery';

type Props = { product: GetProductType; likedProducts: string[] };

const ProductCard = ({ product, likedProducts }: Props) => {
  const { id, name, image, price, heartCount } = product;
  const { user } = useAuthContext() as AuthContextType;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { likeMutate, unlikeMutate } = useLikeProductQuery(id);
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isLiked) {
      unlikeMutate({ uid: user?.uid as string, productId: id });
    } else {
      likeMutate({ uid: user?.uid as string, productId: id });
    }
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    if (likedProducts.length) {
      setIsLiked(likedProducts.includes(id));
    }
  }, [likedProducts, id]);

  return (
    <li className='cursor-pointer' onClick={() => navigate(`/products/${id}`)}>
      <div>
        <img
          className='w-96 h-96 md:w-72 md:h-72'
          src={image}
          alt='product image'
        />
      </div>
      <div className='mt-2 px-2'>
        <h3 className='truncate'>{name}</h3>
        <p className='font-semibold text-price'>{`${price.toLocaleString()}원`}</p>
        <button className='flex items-center' onClick={handleLike}>
          <HeartSvg isLiked={isLiked} />
          <p className='m-1'>{heartCount}</p>
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
