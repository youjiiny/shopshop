import AddImgBtnSvg from 'assets/svg/AddImgBtnSvg';
import DeleteImgBtnSvg from 'assets/svg/DeleteImgBtnSvg';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { RegisteredProduct } from 'types/product';

type Props = {
  subImages: (string | File)[];
  setSubImages: (images: (string | File)[]) => void;
  product?: RegisteredProduct;
  setProduct?: (product: RegisteredProduct) => void;
  setDeleteImages?: React.Dispatch<React.SetStateAction<string[]>>;
};

const ProductImageUploader = ({
  subImages,
  setSubImages,
  product,
  setProduct,
  setDeleteImages,
}: Props) => {
  const [prevImgs, setPrevImgs] = useState<string[]>([]);
  const { id } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const fileNames = files.map((file) => file.name);
      const updated = subImages ? [...subImages, ...files] : files;
      setSubImages(updated);

      if (product && setProduct) {
        const shallow = { ...product };
        shallow.subImg = [...(product.subImg ?? []), ...fileNames];
        setProduct(shallow);
      }
    }
  };
  const handleDelete = (index: number) => {
    if (subImages.length > 0) {
      if (prevImgs.length > 0 && typeof subImages[index] === 'string') {
        setDeleteImages?.((prev) => [...prev, `${subImages[index]}`]);
      }
      setSubImages(subImages.filter((img, i) => i !== index));
      if (product && setProduct) {
        const updatedProduct = {
          ...product,
          subImg: product.subImg.filter((_, i) => i !== index),
        };
        setProduct(updatedProduct);
      }
    }
  };

  useEffect(() => {
    setPrevImgs(subImages?.filter((img) => typeof img === 'string'));
  }, [subImages]);

  return (
    <div className='text-left'>
      <h3 className='text-xl'>상품 이미지 등록</h3>
      <p>상품 사진을 등록해주세요. (여러 장 가능)</p>
      <div className='flex flex-wrap gap-3 mt-4'>
        {subImages?.map((image, i) => {
          return (
            <div key={i} className='relative w-52 h-[184px] rounded-md'>
              <img
                className='w-full h-full object-fill mx-auto mb-3'
                src={
                  typeof image == 'string'
                    ? `${import.meta.env.VITE_S3_SHOPSHOP_PRODUCT_URL}/${id}/${image}`
                    : URL.createObjectURL(image)
                }
                alt={'제품 이미지'}
              />
              <button
                className='absolute top-0 right-0 m-2 cursor-pointer'
                onClick={() => handleDelete(i)}
              >
                <DeleteImgBtnSvg />
              </button>
            </div>
          );
        })}
        <div>
          <input
            className='hidden'
            type='file'
            accept='image/*'
            id='subImg'
            onChange={handleChange}
            //required
            multiple
          />
          <label htmlFor='subImg'>
            <AddImgBtnSvg />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductImageUploader;
