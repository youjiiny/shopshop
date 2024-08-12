import AddImgBtnSvg from 'assets/svg/AddImgBtnSvg';
import DeleteImgBtnSvg from 'assets/svg/DeleteImgBtnSvg';

type Props = {
  subImages: File[] | null;
  setSubImages: (images: File[]) => void;
};

const ProductImageUploader = ({ subImages, setSubImages }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const updated = subImages ? [...subImages, ...files] : files;
      setSubImages(updated);
    }
  };
  const handleDelete = (index: number) => {
    if (subImages) {
      setSubImages(subImages.filter((img, i) => i !== index));
    }
  };
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
                src={URL.createObjectURL(image)}
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
            required
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
