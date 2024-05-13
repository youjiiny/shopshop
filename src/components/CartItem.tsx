import { CartItemType } from 'types/product';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { deleteFromCart, updateCart } from 'api/cart';
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
    <li>
      <img
        className='w-40 h-40 object-contain'
        src={image}
        alt={'상품 이미지'}
      />
      <p>{name}</p>
      <div>옵션:{size}</div>
      <button onClick={handleMinus}>
        <FiMinus size={20} />
      </button>
      <input type='text' value={quantity} readOnly />
      <button onClick={handlePlus}>
        <FiPlus size={20} />
      </button>
      <button onClick={handleDelete}>
        <IoCloseOutline />
      </button>
      <p>{`${(price * quantity).toLocaleString()}원`}</p>
    </li>
  );
};
export default CartItem;
