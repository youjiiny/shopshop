import { addProduct } from 'api/product';
import { uploadImage } from 'api/uploader';
import React, { useState } from 'react';
import { Product } from 'types/product';

const NewProduct = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
    category: '',
    description: '',
    size: '',
  });
  const [file, setFile] = useState<File | null>(null);
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
    const imageUrl = (await uploadImage(file!)) as string;
    addProduct(product, imageUrl);
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
    <form
      className='flex flex-col justify-center items-center gap-5'
      onSubmit={handleSubmit}
    >
      {file && (
        <img
          className='w-42'
          src={URL.createObjectURL(file)}
          alt={'제품 이미지'}
        />
      )}
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
        className='w-96 h-12 bg-primary rounded disabled:bg-neutral-300 text-white'
        disabled={!isValid()}
      >
        제품 등록하기
      </button>
    </form>
  );
};

export default NewProduct;
