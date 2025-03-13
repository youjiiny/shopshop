import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { likeProduct, unlikeProduct } from 'api/like';
import { useProductLikeToggle } from 'hooks/useProductLikeToggle';
import productKeys from 'queries/productKeys';

type Product = { id: string; heartCount: number; isLiked: boolean };

jest.mock('api/like', () => ({
  likeProduct: jest.fn(),
  unlikeProduct: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('useProductLikeToggle', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  test('좋아요를 누르면 like API가 호출되고 , 좋아요 개수가 증가한다.', async () => {
    (likeProduct as jest.Mock).mockResolvedValue({ success: true });
    queryClient.setQueryData(productKeys.all, [
      {
        id: 'test-id',
        heartCount: 10,
        isLiked: false,
      },
    ]);
    const { result } = renderHook(
      () => useProductLikeToggle('test-id', false, 'test-uid'),
      { wrapper },
    );
    act(() => {
      result.current.mutate({ uid: 'test-uid', productId: 'test-id' });
    });
    await waitFor(() => {
      const updated = queryClient.getQueryData(productKeys.all);
      expect(updated).toEqual([
        { id: 'test-id', heartCount: 11, isLiked: true },
      ]);
    });

    expect(likeProduct).toHaveBeenCalledTimes(1);
  });

  test('좋아요를 취소하면 unlike API가 호출되고 좋아요 개수가 감소한다.', async () => {
    (unlikeProduct as jest.Mock).mockRejectedValue({ success: true });
    queryClient.setQueryData(productKeys.all, [
      {
        id: 'test-id',
        heartCount: 11,
        isLiked: true,
      },
    ]);
    const { result } = renderHook(
      () => useProductLikeToggle('test-id', true, 'test-uid'),
      { wrapper },
    );
    act(() => {
      result.current.mutate({ uid: 'test-uid', productId: 'test-id' });
    });
    await waitFor(() => {
      const updated = queryClient.getQueryData(productKeys.all);
      expect(updated).toEqual([
        { id: 'test-id', heartCount: 10, isLiked: false },
      ]);
    });

    expect(unlikeProduct).toHaveBeenCalledTimes(1);
  });

  test('좋아요 기능 api가 실패하면, 기존 좋아요 상태로 돌아간다.', async () => {
    (likeProduct as jest.Mock).mockRejectedValue(new Error('실패'));

    const initialData = queryClient.setQueryData(productKeys.all, [
      { id: 'test-id', heartCount: 10, isLiked: false },
    ]);
    const { result } = renderHook(
      () => useProductLikeToggle('test-id', false, 'user-id'),
      { wrapper },
    );
    act(() => {
      result.current.mutate({ uid: 'test-uid', productId: 'test-id' });
    });

    await waitFor(() => {
      const rollBacked = queryClient.getQueryData(productKeys.all);
      expect(rollBacked).toEqual(initialData);
    });
  });

  test('좋아요 버튼을 연속 2번 클릭하면 좋아요 API는 한 번만 호출된다', async () => {
    (likeProduct as jest.Mock).mockResolvedValue({ success: true });
    (unlikeProduct as jest.Mock).mockResolvedValue({ success: true });
    queryClient.setQueryData(productKeys.all, [
      { id: 'test-id', heartCount: 10, isLiked: false },
    ]);

    const { result: like } = renderHook(
      () => useProductLikeToggle('test-id', false, 'test-uid'),
      { wrapper },
    );
    act(() => {
      like.current.mutate({ uid: 'test-uid', productId: 'test-id' });
    });

    await waitFor(() => {
      expect(likeProduct).toHaveBeenCalledTimes(1);
      expect(unlikeProduct).toHaveBeenCalledTimes(0);
      expect(queryClient.getQueryData(productKeys.all)).toEqual([
        { id: 'test-id', heartCount: 11, isLiked: true },
      ]);
    });

    const products = queryClient.getQueryData<Product[]>(productKeys.all) ?? [];
    const isLiked = products[0].isLiked ?? false;
    const { result: unlike } = renderHook(
      () => useProductLikeToggle('test-id', isLiked, 'test-uid'),
      { wrapper },
    );
    act(() => {
      unlike.current.mutate({ uid: 'test-uid', productId: 'test-id' });
    });

    await waitFor(() => {
      expect(likeProduct).toHaveBeenCalledTimes(1);
      expect(unlikeProduct).toHaveBeenCalledTimes(1);
      expect(queryClient.getQueryData(productKeys.all)).toEqual([
        { id: 'test-id', heartCount: 10, isLiked: false },
      ]);
    });
  });
});
