import AddImgBtnSvg from 'assets/svg/AddImgBtnSvg';
import DeleteImgBtnSvg from 'assets/svg/DeleteImgBtnSvg';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { RegisteredProduct } from 'types/product';

type Props = {
  mainImage: string | File;
  setMainImage: (image: File | null) => void;
  product?: RegisteredProduct;
  setProduct?: (product: RegisteredProduct) => void;
  setDeleteImages?: React.Dispatch<React.SetStateAction<string[]>>;
};

const MainIMageUploader = ({
  mainImage,
  setMainImage,
  product,
  setProduct,
  setDeleteImages,
}: Props) => {
  const [prevImg, setPrevImg] = useState<string>('');
  const { id } = useParams();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log('file', file);
      setMainImage(file as File);

      if (product && setProduct) {
        const shallow = { ...product };
        shallow.mainImg = file.name;
        setProduct(shallow);
      }
    }
  };
  const handleDelete = () => {
    if (prevImg && typeof mainImage === 'string' && prevImg == mainImage) {
      if (setDeleteImages) {
        setDeleteImages((prev) => [...prev, `represent/${prevImg}`]);
      }
    }
    setMainImage(null);
    if (product && setProduct) {
      const shallow = { ...product };
      shallow.mainImg = '';
      setProduct(shallow);
    }
  };

  useEffect(() => {
    if (typeof mainImage == 'string') {
      setPrevImg(mainImage);
    }
  }, [mainImage]);

  return (
    <div className='text-left'>
      <h3 className='text-xl'>대표 이미지 등록</h3>
      <p>제품 대표 사진 1장을 등록해주세요.</p>
      <div>
        {mainImage ? (
          <div className='relative w-52 h-48 rounded-md mt-4'>
            <img
              className='w-full h-full object-fill mx-auto mb-3'
              src={
                typeof mainImage == 'string'
                  ? `${import.meta.env.VITE_S3_SHOPSHOP_PRODUCT_URL}/${id}/represent/${mainImage}`
                  : URL.createObjectURL(mainImage)
              }
              alt={'제품 이미지'}
            />
            <button
              className='absolute top-0 right-0 m-2 cursor-pointer'
              onClick={handleDelete}
            >
              <DeleteImgBtnSvg />
            </button>
          </div>
        ) : (
          <div>
            <input
              className='hidden'
              type='file'
              accept='image/*'
              id='mainImg'
              onChange={handleChange}
              required
            />
            <label className='w-full' htmlFor='mainImg'>
              <AddImgBtnSvg />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainIMageUploader;
