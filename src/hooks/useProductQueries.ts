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

export const useProductQuery = (uid?: string) => {
  const { isLoading: isProductsLoading, data: products } = useQuery<
    GetProductType[]
  >({
    queryKey: ['products'],
    queryFn: () => getProducts(uid),
  });
  return { isProductsLoading, products };
};

export const useProductDetailQuery = (id: string, uid?: string) => {
  const { isLoading: isProductLoading, data: product } =
    useQuery<GetProductType>({
      queryKey: ['products', id as string],
      queryFn: () => getProudctDetail(id, uid),
    });
  return { isProductLoading, product };
};

// export const useProductQuery = (id?: string,uid?:string) => {
//   const queryClient = useQueryClient();

//   const { isLoading: isProductLoading, data: product } = useQuery<
//     GetProductType,
//     DefaultError,
//     GetProductType,
//     [string, string]
//   >({
//     queryKey: ['products', id as string],
//     queryFn: ()=>getProudctDetail(id,uid),
//   });

//   const { mutate: addProductMutate } = useMutation({
//     mutationFn: addProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//     },
//   });

//   const { mutate: deleteProductMutate } = useMutation({
//     mutationFn: deleteProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//     },
//   });

//   const { mutate: updateProductMutate } = useMutation({
//     mutationFn: updateProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//     },
//   });

//   return {
//     isProductsLoading,
//     isProductLoading,
//     products,
//     product,
//     addProductMutate,
//     deleteProductMutate,
//     updateProductMutate,
//   };
// };
