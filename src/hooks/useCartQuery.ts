import {
  DefaultError,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { addCart, deleteFromCart, getMyCart, updateCart } from 'api/cart';
import { useAuthContext } from 'context/AuthContext';
import { CartItemType } from 'types/product';

export const useCartQuery = () => {
  const user = useAuthContext();
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: products,
    error,
  } = useQuery<CartItemType[], DefaultError, CartItemType[], [string, string]>({
    queryKey: ['myCart', user?.uid as string],
    queryFn: getMyCart,
  });

  const { mutate: addToCartMutate } = useMutation({
    mutationFn: addCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCart', user?.uid] });
    },
  });

  const { mutate: deleteFromCartMutate } = useMutation({
    mutationFn: deleteFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCart', user?.uid] });
    },
  });
  const { mutate: updateToCartMutate } = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCart', user?.uid] });
    },
  });

  return {
    isLoading,
    products,
    addToCartMutate,
    deleteFromCartMutate,
    updateToCartMutate,
  };
};
