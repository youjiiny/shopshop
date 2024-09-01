import { updateProductImg } from 'api/aws';
import MainIMageUploader from 'components/MainImageUploader';
import ProductImageUploader from 'components/ProductImageUploader';
import { useProductQuery } from 'hooks/useProductQuery';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { GetProductType, RegisteredProduct } from 'types/product';

const EditProduct = () => {
  const { id } = useParams();
  const {
    isProductLoading,
    product: goods,
    updateProductMutate,
  } = useProductQuery(id);
  const [product, setProduct] = useState<RegisteredProduct>({
    name: '',
    mainImg: '',
    subImg: [],
    price: 0,
    category: '',
    description: '',
    size: '',
  });
  const [mainImage, setMainImage] = useState<string | File | null>();
  const [subImages, setSubImages] = useState<(string | File)[]>();
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof mainImage === 'string' && goods?.mainImg !== mainImage) {
      const mainImgUrl = `${import.meta.env.VITE_S3_SHOPSHOP_PRODUCT_URL}/${id}/represent/${mainImage}`;
      const mainFile = await urlToFile(mainImgUrl, mainImage);
      if (mainFile) {
        setMainImage(mainFile);
      }
    }
    if (subImages?.some((img) => typeof img === 'string')) {
      const updated = await Promise.all(
        subImages.map(async (img) => {
          if (typeof img === 'string') {
            if (!goods?.subImg.includes(img)) {
              // 이미 업로드한 파일이 아니라면
              const subUrl = `${import.meta.env.VITE_S3_SHOPSHOP_PRODUCT_URL}/${id}/${img}`;
              return await urlToFile(subUrl, img);
            } else return null;
          }
          return img;
        }),
      );
      setSubImages((prev) => prev?.filter((img) => img !== null));
    }

    await updateProductImg({
      id: id as string,
      deleted: deleteImages && deleteImages.length > 0 ? deleteImages : [],
      mainImg: mainImage && mainImage instanceof File ? mainImage : null,
      subImg:
        subImages && subImages.length > 0
          ? (subImages.filter((img) => img instanceof File) as File[])
          : null,
    });
    updateProductMutate({ id: id as string, updated: product });
    navigate('/');
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct({ ...(product as GetProductType), [name]: value });
  };

  const urlToFile = async (url: string, fileName: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const ext = url.split('.').at(-1);
    return new File([blob], fileName, {
      type: `image/${ext}`,
    });
  };

  const isValid = () => {
    if (
      goods?.name !== product.name ||
      goods?.mainImg !== product.mainImg ||
      goods?.subImg !== product.subImg ||
      goods?.price !== product.price ||
      goods?.category !== product.category ||
      goods?.description !== product.description ||
      (Array.isArray(goods?.size) && goods?.size.join(',') !== product.size)
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (goods) {
      const { heartCount, createdAt, uploader, ...rest } = goods;
      setProduct(rest);
      const { mainImg, subImg } = rest;
      setMainImage(mainImg);
      setSubImages(subImg);
    }
  }, [goods, id]);

  if (isProductLoading) return <p>Loading...</p>;
  const { name, price, category, description, size, mainImg, subImg } = product;

  return (
    <section className='w-11/12 text-center  mx-auto mt-20 pb-10'>
      <h2 className='text-2xl font-semibold my-5'>제품 등록</h2>
      <form className='flex flex-col px-12 gap-5' onSubmit={handleSubmit}>
        <div className='flex items-center'>
          <h3 className='text-lg'>제품명</h3>
          <input
            className='w-1/2 h-10 p-2 ml-8 rounded-md'
            type='text'
            name='name'
            value={name}
            onChange={handleChange}
            placeholder='제품명'
          />
        </div>
        <div className='flex items-center'>
          <h3 className='text-lg'>가격</h3>
          <input
            className='h-10 ml-12 p-2 rounded-md'
            type='number'
            name='price'
            value={product?.price == 0 ? '' : product?.price}
            onChange={handleChange}
            placeholder='가격'
          />
        </div>
        <div className='flex items-center'>
          <h3 className='text-lg'>카테고리</h3>
          <input
            className='h-10 ml-3 p-2 rounded-md'
            type='text'
            name='category'
            value={category}
            onChange={handleChange}
            placeholder='카테고리'
          />
        </div>
        <div className='flex items-center'>
          <h3 className='text-lg'>사이즈</h3>
          <input
            className='h-10 ml-7 p-2 rounded-md'
            type='text'
            name='size'
            value={size}
            onChange={handleChange}
            placeholder='사이즈(콤마(,)로 구분)'
          />
        </div>
        <div className='flex flex-col items-start gap-4'>
          <h3 className='text-lg'>제품 설명</h3>
          <textarea
            className='w-7/12 h-44 border p-2 rounded-md'
            name='description'
            value={description}
            onChange={handleChange}
            placeholder='제품 설명'
          />
        </div>
        <MainIMageUploader
          mainImage={mainImage as string}
          setMainImage={setMainImage}
          product={product}
          setProduct={setProduct}
          setDeleteImages={setDeleteImages}
        />
        <ProductImageUploader
          subImages={subImages as string[]}
          setSubImages={setSubImages}
          product={product}
          setProduct={setProduct}
          setDeleteImages={setDeleteImages}
        />
        <button
          className='h-14 mt-4 bg-primary rounded disabled:bg-neutral-300 text-2xl text-white'
          disabled={!goods || !isValid()}
        >
          수정하기
        </button>
      </form>
    </section>
  );
};

export default EditProduct;
