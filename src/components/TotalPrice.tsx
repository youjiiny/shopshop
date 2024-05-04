import { useProductCountContext } from 'context/ProductCountContext';
import { ProductCountContextType } from 'types/product';

const TotalPrice = () => {
  const { price, selected } =
    useProductCountContext() as ProductCountContextType;
  const count = Object.values(selected!).reduce((acc, cur) => (acc += cur), 0);
  return (
    <div className='flex items-center justify-between py-4'>
      <p className='text-lg'>총 상품 금액</p>
      <p className='text-2xl text-price-stress'>
        <strong>{(price * count).toLocaleString()}</strong>
        <span>원</span>
      </p>
    </div>
  );
};

export default TotalPrice;
