const Banner = () => {
  return (
    <div className='h-96 bg-slate-50'>
      <picture className='w-full h-full'>
        <source
          srcSet='/images/banner-large.webp'
          type='image/webp'
          media='(min-width: 1200px)'
          className='w-full h-full object-cover object-center'
        />
        <source
          srcSet='/images/banner-medium.webp'
          type='image/webp'
          media='(max-width: 1199px)'
          className='w-full h-full object-cover object-center'
        />
        <img
          src='/images/banner.jpg'
          className='w-full h-full object-cover object-center'
          alt='배너'
        />
      </picture>
    </div>
  );
};

export default Banner;
