import { useModalStore } from 'store/modal';
import { GetProductType } from 'types/product';
import ProductDeletionModal from './ProductDeletionModal';
import { Link } from 'react-router-dom';

const AdminProductCard = ({ product }: { product: GetProductType }) => {
  const { id, name, image, price, mainImg, subImg } = product;
  const { openModal } = useModalStore();
  console.log('image', image, 'mainImg', mainImg);

  return (
    <li className='flex items-center justify-around border py-5'>
      <img
        className='w-24 h-24 rounded-md'
        src={`${import.meta.env.VITE_CLOUDFRONT_URL}/${id}/represent/${mainImg}?w=200&h=200`}
        alt={name}
      />
      <div>
        <p>{name}</p>
        <p>{`${price.toLocaleString()}원`}</p>
      </div>
      <div className='flex flex-col gap-2'>
        <Link to={`/admin/product/edit/${id}`}>
          <button className='bg-primary text-white p-2'>수정하기</button>
        </Link>
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
