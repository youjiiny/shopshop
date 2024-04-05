import { GetProductType } from 'types/product';

const ProductCard = ({ product }: { product: GetProductType }) => {
  const { name, image, price } = product;
  return (
    <li>
      <img src={image} alt='product image' />
      <div>
        <h3>{name}</h3>
        <p>{price.toLocaleString()}</p>
      </div>
    </li>
  );
};

export default ProductCard;
