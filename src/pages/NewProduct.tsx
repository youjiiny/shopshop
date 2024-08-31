import { uploadProductImg } from 'api/aws';
import { addProduct } from 'api/product';
import MainIMageUploader from 'components/MainImageUploader';
import ProductImageUploader from 'components/ProductImageUploader';
import { useAuthContext } from 'context/AuthContext';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContextType } from 'types/auth';
import { AddProductType } from 'types/product';
import { v4 as uuidv4 } from 'uuid';

const NewProduct = () => {
  const [product, setProduct] = useState<Omit<AddProductType, 'id'>>({
    name: '',
    price: 0,
    category: '',
    description: '',
    size: '',
  });
  const [mainImage, setMainImage] = useState<File | null>();
  const [subImages, setSubImages] = useState<(string | File)[] | null>();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { user } = useAuthContext() as AuthContextType;
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    //const id = await addProduct
    const id = uuidv4();
    const { mainImg, subImg } = await uploadProductImg({
      id,
      mainImage: mainImage as File,
      subImage: subImages as File[],
    });
    await addProduct({ ...product, id }, mainImg, subImg, user?.uid as string);
    toast.success('제품이 추가되었습니다.');
    setIsUploading(false);
    navigate('/');
  };
  const isValid = () => {
    return mainImage &&
      subImages &&
      subImages?.length > 0 &&
      product.name.trim() !== '' &&
      product.category.trim() !== '' &&
      product.description.trim() !== '' &&
      product.size.trim() !== '' &&
      product.price > 0
      ? true
      : false;
  };
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
            value={product.name}
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
            value={product.price == 0 ? '' : product.price}
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
            value={product.category}
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
            value={product.size}
            onChange={handleChange}
            placeholder='사이즈(콤마(,)로 구분)'
          />
        </div>
        <div className='flex flex-col items-start gap-4'>
          <h3 className='text-lg'>제품 설명</h3>
          <textarea
            className='w-7/12 h-44 border p-2 rounded-md'
            name='description'
            value={product.description}
            onChange={handleChange}
            placeholder='제품 설명'
          />
        </div>
        <MainIMageUploader
          mainImage={mainImage as File}
          setMainImage={setMainImage}
        />
        <ProductImageUploader
          subImages={subImages as File[]}
          setSubImages={setSubImages}
        />
        <button
          className='h-14 mt-4 bg-primary rounded disabled:bg-neutral-300 text-2xl text-white'
          disabled={!isValid()}
        >
          {isUploading ? '업로드 중...' : '제품 등록하기'}
        </button>
      </form>
    </section>
  );
};

export default NewProduct;
