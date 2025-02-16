import { GetProductType, LikedProductType } from 'types/product';
import { useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton';

type Props = {
  product: GetProductType | LikedProductType;
};

const ProductCard = ({ product }: Props) => {
  const { id, name, mainImg, price, isLiked, heartCount } = product;
  const navigate = useNavigate();

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
        <p className='font-semibold text-price mb-1'>{`${price.toLocaleString()}원`}</p>
        <LikeButton isLiked={isLiked} id={id} heartCount={heartCount} />
      </div>
    </li>
  );
};

export default ProductCard;
