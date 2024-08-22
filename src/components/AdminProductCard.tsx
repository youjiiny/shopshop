import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProductImg } from 'api/aws';
import { deleteProduct } from 'api/product';
import { GetProductType } from 'types/product';

const AdminProductCard = ({ product }: { product: GetProductType }) => {
  const { id, name, image, price, mainImg, subImg } = product;
  console.log('image', image, 'mainImg', mainImg);
  const queryClient = useQueryClient();
  const deleteProductMutate = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  const handleDelete = () => {
    deleteProductMutate.mutate(id);
    deleteProductImg(id, mainImg, subImg);
  };
  return (
    <li className='flex items-center justify-around border py-5'>
      <img
        className='w-24 h-24'
        src={
          mainImg
            ? `${import.meta.env.VITE_S3_SHOPSHOP_PRODUCT_URL}/${id}/represent/${mainImg}`
            : image
        }
        alt={name}
      />
      <div>
        <p>{name}</p>
        <p>{`${price.toLocaleString()}원`}</p>
      </div>
      <div className='flex flex-col'>
        <button>수정하기</button>
        <button onClick={handleDelete}>삭제하기</button>
      </div>
    </li>
  );
};

export default AdminProductCard;
