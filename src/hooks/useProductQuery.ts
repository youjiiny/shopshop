import {
  DefaultError,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProudctDetail,
  updateProduct,
} from 'api/product';
import { GetProductType } from 'types/product';

export const useProductQuery = (id?: string) => {
  const queryClient = useQueryClient();
  const { isLoading: isProductsLoading, data: products } = useQuery<
    GetProductType[],
    DefaultError,
    GetProductType[],
    [string]
  >({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  const { isLoading: isProductLoading, data: product } = useQuery<
    GetProductType,
    DefaultError,
    GetProductType,
    [string, string]
  >({
    queryKey: ['products', id as string],
    queryFn: getProudctDetail,
  });

  const { mutate: addProductMutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const { mutate: deleteProductMutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const { mutate: updateProductMutate } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    isProductsLoading,
    isProductLoading,
    products,
    product,
    addProductMutate,
    deleteProductMutate,
    updateProductMutate,
  };
};
