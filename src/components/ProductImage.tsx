type Props = { id: string; subImg: string[] };

const ProductImage = ({ id, subImg }: Props) => {
  return (
    <>
      <h2 className='text-2xl font-bold'>상품 정보</h2>
      <div className='flex flex-col gap-10'>
        <picture>
          {subImg?.map((img, i) => (
            <>
              <source
                srcSet={`${import.meta.env.VITE_S3_SHOPSHOP_PRODUCT_URL}/${id}/${img}`}
                type='image/webp'
              />
              <img
                className='w-full object-cover'
                src={`${import.meta.env.VITE_S3_SHOPSHOP_PRODUCT_URL}/${id}/${img}`}
                key={i}
                alt='상품 디테일 이미지'
              />
            </>
          ))}
        </picture>
      </div>
    </>
  );
};

export default ProductImage;
