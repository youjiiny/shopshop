import { GetProductType } from 'types/product';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }: { product: GetProductType }) => {
  const { id, name, image, price } = product;
  const navigate = useNavigate();

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
        <button className='flex items-center'>
          <IoMdHeartEmpty />
          <p className='m-1'>0</p>
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
