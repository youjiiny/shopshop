import { useProductCountContext } from 'context/ProductCountContext';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { ProductCountContextType } from 'types/product';

export const SelectedProductQuantity = ({ option }: { option: string }) => {
  const { selected, price, addCount, minusCount } =
    useProductCountContext() as ProductCountContextType;

  return (
    <li className='flex'>
      <p>{option}</p>
      <div>
        <button onClick={() => minusCount(option)}>
          <FiMinus />
        </button>
        <input type='text' value={selected![option]} readOnly />
        <button onClick={() => addCount(option)}>
          <FiPlus />
        </button>
      </div>
      <p>{`${price.toLocaleString()}원`}</p>
    </li>
  );
};
