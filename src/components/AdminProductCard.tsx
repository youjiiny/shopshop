import { useModalStore } from 'store/modal';
import { GetProductType } from 'types/product';
import ProductDeletionModal from './ProductDeletionModal';

const AdminProductCard = ({ product }: { product: GetProductType }) => {
  const { id, name, image, price, mainImg, subImg } = product;
  const { openModal } = useModalStore();
  console.log('image', image, 'mainImg', mainImg);

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
      <div className='flex flex-col gap-2'>
        <button className='bg-primary text-white p-2'>수정하기</button>
        <button
          className='bg-primary text-white p-2'
          onClick={() =>
            openModal(
              <ProductDeletionModal product={{ id, mainImg, subImg }} />,
            )
          }
        >
          삭제하기
        </button>
      </div>
    </li>
  );
};

export default AdminProductCard;
