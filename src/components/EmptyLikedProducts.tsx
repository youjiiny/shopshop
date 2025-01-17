import { Link } from 'react-router-dom';

const EmptyLikedProducts = () => {
  return (
    <div className='px-12 pt-12 pb-48'>
      <div className='pt-20 text-center  text-4xl border-t-4 md:border-b-2 border-black py-24'>
        <h3 className='text-lg md:text-3xl'>좋아요를 누른 상품이 없습니다.</h3>
        <div className='flex justify-center mt-10'>
          <Link
            to='/'
            className='flex flex-1 justify-center items-center max-w-60 md:max-w-[400px] h-14 border border-gray-500 text-lg md:text-2xl font-bold'
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyLikedProducts;
