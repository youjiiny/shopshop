import AddImgBtnSvg from 'assets/svg/AddImgBtnSvg';
import DeleteImgBtnSvg from 'assets/svg/DeleteImgBtnSvg';

type Props = {
  mainImage: File | null;
  setMainImage: (image: File | null) => void;
};

const MainIMageUploader = ({ mainImage, setMainImage }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setMainImage(file);
    }
  };
  const handleDelete = () => {
    setMainImage(null);
  };
  return (
    <div className='text-left'>
      <h3 className='text-xl'>대표 이미지 등록</h3>
      <p>제품 대표 사진 1장을 등록해주세요.</p>
      <div>
        {mainImage ? (
          <div className='relative w-52 h-48 rounded-md mt-4'>
            <img
              className='w-full h-full object-fill mx-auto mb-3'
              src={URL.createObjectURL(mainImage)}
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
