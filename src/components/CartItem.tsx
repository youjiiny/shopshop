import { CartItemType } from 'types/product';
import { FiMinusSquare, FiPlusSquare } from 'react-icons/fi';
import { deleteFromCart, updateCart } from 'api/cart';
import { IoCloseOutline } from 'react-icons/io5';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = { uid: string; product: CartItemType };

const CartItem = ({ uid, product }: Props) => {
  const queryClient = useQueryClient();
  const { id, name, image, price, size, quantity } = product;
  const handleMinus = () => {
    if (quantity <= 1) return;
    const updated = { ...product, quantity: quantity - 1 };
    updateToCartMutation.mutate({ uid, updated });
  };
  const handlePlus = () => {
    const updated = { ...product, quantity: quantity + 1 };
    updateToCartMutation.mutate({ uid, updated });
  };
  const handleDelete = () => {
    deleteFromCartMutation.mutate({ uid, product });
  };

  const updateToCartMutation = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCart', uid] });
    },
  });
  const deleteFromCartMutation = useMutation({
    mutationFn: deleteFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCart', uid] });
    },
  });
  return (
    <li className='flex justify-between items-center p-4 border-b-2'>
      <img
        className='w-24 h-24 md:w-40 md:h-40 rounded-lg object-contain'
        src={image}
        alt={'상품 이미지'}
      />
      <div className='flex-1 flex  justify-between'>
        <div className='basis-2/5'>
          <div className='flex justify-between items-center'>
            <p className='font-semibold md:text-lg'>{name}</p>
            <button
              className='w-6 h-6 border border-zinc-300 text-zinc-300 text-center'
              onClick={handleDelete}
            >
              <IoCloseOutline size={24} />
            </button>
          </div>
          <p className='text-sm text-light-black'>옵션:{size}</p>
        </div>

        <div className='flex items-center gap-1 basis-2/5 text-xl md:text-2xl'>
          <button className='text-slate-400' onClick={handleMinus}>
            <FiMinusSquare />
          </button>
          <span className='text-lg'>{quantity}</span>
          <button className='text-slate-400' onClick={handlePlus}>
            <FiPlusSquare />
          </button>
        </div>
      </div>
      <div className='basis-1/5 text-center text-lg md:text-xl font-semibold text-price'>
        <p>{`${(price * quantity).toLocaleString()}원`}</p>
      </div>
    </li>
  );
};
export default CartItem;
