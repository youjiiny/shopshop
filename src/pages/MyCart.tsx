import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyCart } from 'api/cart';
import CartItem from 'components/CartItem';
import { useAuthContext } from 'context/AuthContext';
import type { CartItemType } from 'types/product';

const MyCart = () => {
  const user = useAuthContext();
  const { isLoading, data: products } = useQuery<CartItemType[]>({
    queryKey: ['myCart', user?.uid],
    queryFn: () => getMyCart(user!.uid),
  });
  if (isLoading) <p>Loading...</p>;

  return (
    <section>
      {!products?.length && <p>장바구니에 상품이 없습니다.</p>}
      <ul>
        {products?.map((product) => (
          <CartItem key={product.id} product={product} uid={user!.uid} />
        ))}
      </ul>
    </section>
  );
};

export default MyCart;
