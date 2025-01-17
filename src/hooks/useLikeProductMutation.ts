import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeProduct, unlikeProduct } from 'api/like';
import productKeys from 'queries/productKeys';
import { GetProductType } from 'types/product';

type Context = {
  previousProducts?: GetProductType[];
  previousProductDetail?: GetProductType;
};
const updateHeart = (
  queryClient: ReturnType<typeof useQueryClient>,
  id: string,
  delta: number,
) => {
  queryClient.setQueryData(
    productKeys.all,
    (data: GetProductType[] | undefined) =>
      data?.map((product) =>
        product.id === id
          ? { ...product, heartCount: product.heartCount + delta }
          : product,
      ),
  );
  queryClient.setQueryData(
    productKeys.detail(id),
    (data: GetProductType | undefined) =>
      data ? { ...data, heartCount: data.heartCount + delta } : data,
  );
};
export const useLikeMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likeProduct,
    onMutate: () => {
      const previousProducts = queryClient.getQueryData<
        Context['previousProducts']
      >(productKeys.all);
      const previousProductDetail = queryClient.getQueryData<
        Context['previousProducts']
      >(productKeys.detail(id));

      updateHeart(queryClient, id, 1);
      return { previousProducts, previousProductDetail };
    },
    onError: (context: Context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(productKeys.all, context.previousProducts);
      }
      if (context?.previousProductDetail) {
        queryClient.setQueryData(
          productKeys.all,
          context.previousProductDetail,
        );
      }
    },
  });
};

export const useUnLikeMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unlikeProduct,
    onMutate: () => {
      const previousProducts = queryClient.getQueryData<
        Context['previousProducts']
      >(productKeys.all);
      const previousProductDetail = queryClient.getQueryData<
        Context['previousProducts']
      >(productKeys.detail(id));

      updateHeart(queryClient, id, -1);

      return { previousProducts, previousProductDetail };
    },
    onError: (context: Context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(productKeys.all, context.previousProducts);
      }
      if (context?.previousProductDetail) {
        queryClient.setQueryData(
          productKeys.all,
          context.previousProductDetail,
        );
      }
    },
  });
};
