import LikedProducts from 'components/LikedProducts';

const MyPage = () => {
  return (
    <div className='w-full border-b'>
      <h3 className='text-2xl mb-4 pb-2 border-b-4 border-black'>My Heart</h3>
      <LikedProducts />
    </div>
  );
};

export default MyPage;
