import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeProduct, unlikeProduct } from 'api/like';
import mypageKeys from 'queries/mypageKeys';
import productKeys from 'queries/productKeys';
import { GetProductType, LikedProductType } from 'types/product';

type Context = {
  previousProducts?: GetProductType[];
  previousProductDetail?: GetProductType;
  previousLikedProducts?: LikedProductType[];
};
const updateHeart = (
  queryClient: ReturnType<typeof useQueryClient>,
  id: string,
  delta: number,
  uid?: string,
) => {
  queryClient.setQueryData(
    productKeys.all,
    (data: GetProductType[] | undefined) =>
      data?.map((product) =>
        product.id === id
          ? {
              ...product,
              heartCount: product.heartCount + delta,
              isLiked: delta > 0,
            }
          : product,
      ),
  );
  queryClient.setQueryData(
    productKeys.detail(id),
    (data: GetProductType | undefined) =>
      data
        ? { ...data, heartCount: data.heartCount + delta, isLiked: delta > 0 }
        : data,
  );
  if (uid) {
    queryClient.setQueryData(
      mypageKeys.liked(uid),
      (data: LikedProductType[] | undefined) =>
        data?.map((product) =>
          product.id === id
            ? {
                ...product,
                heartCount: product.heartCount + delta,
                isLiked: delta > 0,
              }
            : product,
        ),
    );
  }
};
export const useLikeMutation = (id: string, uid?: string) => {
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
      const previousLikedProducts = uid
        ? queryClient.getQueryData<Context['previousLikedProducts']>(
            mypageKeys.liked(uid),
          )
        : undefined;

      updateHeart(queryClient, id, 1, uid);
      return { previousProducts, previousProductDetail, previousLikedProducts };
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
      if (uid && context?.previousLikedProducts) {
        queryClient.setQueryData(
          mypageKeys.liked(uid),
          context.previousLikedProducts,
        );
      }
    },
  });
};

export const useUnLikeMutation = (id: string, uid?: string) => {
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
      const previousLikedProducts = uid
        ? queryClient.getQueryData<Context['previousLikedProducts']>(
            mypageKeys.liked(uid),
          )
        : undefined;

      updateHeart(queryClient, id, -1, uid);

      return { previousProducts, previousProductDetail, previousLikedProducts };
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
      if (uid && context?.previousLikedProducts) {
        queryClient.setQueryData(
          mypageKeys.liked(uid),
          context.previousLikedProducts,
        );
      }
    },
  });
};
