import { useProductCountContext } from 'context/ProductCountContext';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { ProductCountContextType } from 'types/product';

export const SelectedProductQuantity = ({ option }: { option: string }) => {
  const { selected, price, deleteSize, addCount, minusCount } =
    useProductCountContext() as ProductCountContextType;

  return (
    <li className='flex items-center gap-6 py-3 border-b-2'>
      <p className='font-medium grow'>{option}</p>
      <div className='flex items-center'>
        <button
          className='w-9 h-9 flex justify-center items-center border border-stone-300 text-center text-neutral-600'
          onClick={() => minusCount(option)}
        >
          <FiMinus size={20} />
        </button>
        <input
          type='text'
          className='w-9 h-9 text-center'
          value={selected![option]}
          readOnly
        />
        <button
          className='w-9 h-9 flex justify-center items-center border border-stone-300 text-neutral-600'
          onClick={() => addCount(option)}
        >
          <FiPlus size={20} />
        </button>
      </div>
      <div className='w-36 flex justify-end items-center gap-2'>
        <p className='font-semibold'>{`${price.toLocaleString()}원`}</p>
        <button
          className='w-4 h-4 border border-stone-300 text-neutral-600 rounded-full'
          onClick={() => deleteSize(option)}
        >
          <IoCloseOutline />
        </button>
      </div>
    </li>
  );
};
