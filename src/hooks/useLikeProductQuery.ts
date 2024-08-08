import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeProduct, unlikeProduct } from 'api/like';
import { GetProductType } from 'types/product';

export const useLikeProductQuery = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate: likeMutate } = useMutation({
    mutationFn: likeProduct,
    onMutate: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'products') {
          const value: GetProductType[] | GetProductType | undefined =
            queryClient.getQueryData(queryKey);

          if (Array.isArray(value)) {
            const index = value.findIndex((v) => v.id === id);
            if (index > -1) {
              const shallow = [...value];
              shallow[index] = {
                ...shallow[index],
                heartCount: shallow[index].heartCount + 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            if (value.id === id) {
              const shallow = {
                ...value,
                heartCount: value.heartCount + 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onError: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'products') {
          const value: GetProductType[] | GetProductType | undefined =
            queryClient.getQueryData(queryKey);

          if (Array.isArray(value)) {
            const index = value.findIndex((v) => v.id === id);
            if (index > -1) {
              const shallow = [...value];
              shallow[index] = {
                ...shallow[index],
                heartCount: shallow[index].heartCount - 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            if (value.id === id) {
              const shallow = {
                ...value,
                heartCount: value.heartCount - 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
  });
  const { mutate: unlikeMutate } = useMutation({
    mutationFn: unlikeProduct,
    onMutate: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'products') {
          const value: GetProductType[] | GetProductType | undefined =
            queryClient.getQueryData(queryKey);

          if (Array.isArray(value)) {
            const index = value.findIndex((v) => v.id === id);
            if (index > -1) {
              const shallow = [...value];
              shallow[index] = {
                ...shallow[index],
                heartCount: shallow[index].heartCount - 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            if (value.id === id) {
              const shallow = {
                ...value,
                heartCount: value.heartCount - 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onError: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'products') {
          const value: GetProductType[] | GetProductType | undefined =
            queryClient.getQueryData(queryKey);

          if (Array.isArray(value)) {
            const index = value.findIndex((v) => v.id === id);
            if (index > -1) {
              const shallow = [...value];
              shallow[index] = {
                ...shallow[index],
                heartCount: shallow[index].heartCount + 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            if (value.id === id) {
              const shallow = {
                ...value,
                heartCount: value.heartCount + 1,
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
  });

  return { likeMutate, unlikeMutate };
};
