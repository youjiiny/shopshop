import { useQuery } from '@tanstack/react-query';
import { getProducts, getProductDetail } from 'api/product';
import productKeys from 'queries/productKeys';
import { GetProductType } from 'types/product';

export const useProductQuery = (uid?: string) => {
  const { isLoading: isProductsLoading, data: products } = useQuery<
    GetProductType[]
  >({
    queryKey: productKeys.all,
    queryFn: () => getProducts(uid),
  });
  return { isProductsLoading, products };
};

export const useProductDetailQuery = (id: string, uid?: string) => {
  const { isLoading: isProductLoading, data: product } =
    useQuery<GetProductType>({
      queryKey: productKeys.detail(id),
      queryFn: () => getProductDetail(id, uid),
    });
  return { isProductLoading, product };
};
