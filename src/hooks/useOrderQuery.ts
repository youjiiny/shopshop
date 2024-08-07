import {
  DefaultError,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getOrders, updateOrder } from 'api/order';
import { useAuthContext } from 'context/AuthContext';
import { AuthContextType } from 'types/auth';
import { OrderList } from 'types/order';

export const useOrderQuery = () => {
  const { user } = useAuthContext() as AuthContextType;
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery<
    OrderList[],
    DefaultError,
    OrderList[],
    [string, string, string]
  >({
    queryKey: ['mypage', user?.uid as string, 'orders'],
    queryFn: getOrders,
  });
  const { mutate: cancelOrderMutate } = useMutation({
    mutationFn: updateOrder,
    onSuccess: (data, variables) => {
      const { orderId } = variables;
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if ((queryKey[0] === 'mypage', queryKey[2] === 'orders')) {
          const value: OrderList[] | undefined =
            queryClient.getQueryData(queryKey);
          if (value) {
            const order = value.find((v) => v.orderId === orderId);
            if (order) {
              const index = value.findIndex((v) => v.orderId === orderId);
              const shallow = [...value];
              shallow[index] = {
                ...shallow[index],
                status: 'cancelled',
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
  });
  return { isLoading, orders, cancelOrderMutate };
};
