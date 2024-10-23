type Props = { id: string; subImg: string[] };

const ProductImage = ({ id, subImg }: Props) => {
  return (
    <section className='mt-14 px-10'>
      <h2 className='text-2xl font-bold mb-5'>상품 설명</h2>
      <div className='flex flex-col'>
        {subImg?.map((img, i) => (
          <img
            key={i}
            className='object-cover mb-16'
            src={`${import.meta.env.VITE_S3_SHOPSHOP_PRODUCT_URL}/${id}/${img}`}
            width={'100%'}
            alt='상품 디테일 이미지'
          />
        ))}
      </div>
    </section>
  );
};

export default ProductImage;
