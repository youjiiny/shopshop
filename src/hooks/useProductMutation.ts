import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct, deleteProduct, updateProduct } from 'api/product';
import productKeys from 'queries/productKeys';

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: addProductMutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
  return { addProductMutate };
};
export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProductMutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
  return { deleteProductMutate };
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: updateProductMutate } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
  return { updateProductMutate };
};
