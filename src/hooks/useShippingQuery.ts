import {
  DefaultError,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { addShippingAddress, getShippingAddress } from 'api/auth';
import { useAuthContext } from 'context/AuthContext';
import { Address } from 'types/auth';

export const useShippingQuery = () => {
  const user = useAuthContext();
  const queryClient = useQueryClient();
  const { data: address, error } = useQuery<
    Address,
    DefaultError,
    Address,
    [string, string, string]
  >({
    queryKey: ['users', user?.uid as string, 'address'],
    queryFn: getShippingAddress,
    enabled: !user?.isAdmin,
  });

  const { mutate: saveAddressMutate } = useMutation({
    mutationFn: addShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users', user?.uid as string, 'address'],
      });
    },
  });

  return {
    address,
    saveAddressMutate,
  };
};
