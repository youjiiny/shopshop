import { deleteProductImg } from 'api/aws';
import { useProductQuery } from 'hooks/useProductQuery';
import { useState } from 'react';
import { useModalStore } from 'store/modal';

type Props = { id: string; mainImg: string; subImg: string[] };

const ProductDeletionModal = ({ product }: { product: Props }) => {
  const { closeModal } = useModalStore();
  const { id, mainImg, subImg } = product;
  const [message, setMessage] = useState<string>('');

  const { deleteProductMutate } = useProductQuery();
  const handleDelete = () => {
    deleteProductMutate(id, {
      onSuccess: () => {
        deleteProductImg(id, mainImg, subImg).then(() => {
          setMessage('제품이 성공적으로 삭제되었습니다.');
        });
      },
    });
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
