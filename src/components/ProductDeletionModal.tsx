import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductImg } from 'api/aws';
import { deleteProduct } from 'api/product';
import { useState } from 'react';
import { useModalStore } from 'store/modal';

type Props = { id: string; mainImg: string; subImg: string[] };

const ProductDeletionModal = ({ product }: { product: Props }) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();
  const { id, mainImg, subImg } = product;
  const [message, setMessage] = useState<string>('');

  const deleteProductMutate = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setMessage('제품이 성공적으로 삭제되었습니다.');
    },
  });
  const handleDelete = () => {
    deleteProductMutate.mutate(id);
    deleteProductImg(id, mainImg, subImg);
  };

  return (
    <div className='flex flex-col gap-5 text-center leading-6'>
      <p className='text-lg break-keep whitespace-pre-wrap leading-6'>
        {message ? message : '상품을 삭제하겠습니까?'}
      </p>
      {message ? (
        <div className='mt-3'>
          <button
            className='w-40 border border-gray-400 p-3'
            onClick={closeModal}
          >
            확인
          </button>
        </div>
      ) : (
        <div className='flex gap-3 mt-3'>
          <button
            className='w-40 border border-gray-400 p-3'
            onClick={closeModal}
          >
            아니오
          </button>
          <button
            className='w-40 border border-gray-400 p-3 bg-black text-white'
            onClick={handleDelete}
          >
            예
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDeletionModal;
