type Props = { id: string; subImg: string[] };

const ProductImage = ({ id, subImg }: Props) => {
  return (
    <>
      <h2 className='text-2xl font-bold'>상품 정보</h2>
      <div className='flex flex-col gap-10'>
        {subImg?.map((img, i) => (
          <img
            className='w-full object-cover'
            src={`${import.meta.env.VITE_S3_SHOPSHOP_PRODUCT_URL}/${id}/${img}`}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default ProductImage;
