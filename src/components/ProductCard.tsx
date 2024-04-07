import { GetProductType } from 'types/product';

const ProductCard = ({ product }: { product: GetProductType }) => {
  const { name, image, price } = product;
  return (
    <li className='cursor-pointer'>
      <div className='w-full md:w-64 md:h-64'>
        <img className='w-full h-full' src={image} alt='product image' />
      </div>
      <div className='mt-2 px-2'>
        <h3 className='truncate'>{name}</h3>
        <p className='font-semibold text-price'>{`${price.toLocaleString()}원`}</p>
      </div>
    </li>
  );
};

export default ProductCard;
