import { addProduct } from 'api/product';
import { uploadImage } from 'api/uploader';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AddProductType } from 'types/product';

const NewProduct = () => {
  const [product, setProduct] = useState<AddProductType>({
    name: '',
    price: 0,
    category: '',
    description: '',
    size: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name, value } = e.target;
    if (files) {
      setFile(files![0]);
      return;
    }
    setProduct({ ...product, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    const imageUrl = (await uploadImage(file!)) as string;
    await addProduct(product, imageUrl);
    toast.success('제품이 추가되었습니다.');
    setIsUploading(false);
  };
  const isValid = () => {
    return file &&
      product.name.trim() !== '' &&
      product.category.trim() !== '' &&
      product.description.trim() !== '' &&
      product.size.trim() !== '' &&
      product.price > 0
      ? true
      : false;
  };
  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-semibold my-4'>제품 등록</h2>
      {file && (
        <img
          className='w-96 mx-auto mb-3'
          src={URL.createObjectURL(file)}
          alt={'제품 이미지'}
        />
      )}
      <form className='flex flex-col px-12 gap-5' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          name='img'
          onChange={handleChange}
          placeholder='제품 이미지'
        />
        <input
          type='text'
          name='name'
          value={product.name}
          onChange={handleChange}
          placeholder='제품명'
        />
        <input
          type='number'
          name='price'
          value={product.price == 0 ? '' : product.price}
          onChange={handleChange}
          placeholder='가격'
        />
        <input
          type='text'
          name='category'
          value={product.category}
          onChange={handleChange}
          placeholder='카테고리'
        />
        <input
          type='text'
          name='description'
          value={product.description}
          onChange={handleChange}
          placeholder='제품 설명'
        />
        <input
          type='text'
          name='size'
          value={product.size}
          onChange={handleChange}
          placeholder='사이즈(콤마(,)로 구분)'
        />
        <button
          className='h-14 bg-primary rounded disabled:bg-neutral-300 text-2xl text-white'
          disabled={!isValid()}
        >
          {isUploading ? '업로드 중...' : '제품 등록하기'}
        </button>
      </form>
    </section>
  );
};

export default NewProduct;
