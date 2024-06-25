const ShippingInfo = () => {
  return (
    <section>
      <header className='flex items-center justify-between border-black border-t-2 '>
        <h2 className='flex items-center font-bold h-16'>
          배송 정보
          <button className='w-4 h-4 ml-1 border border-slate-400 rounded-full text-xs text-light-gray'>
            ?
          </button>
        </h2>
        <p className='text-light-gray text-xs'>
          <i className='text-red-600'>* </i>
          표시는 필수입력 항목
        </p>
      </header>
      <div className='mb-5'>
        <ul className='flex w-full border-b'>
          <li
            role='button'
            className='w-40 h-14 flex items-center justify-center text-sm cursor:pointer border'
          >
            기존 배송지
          </li>
          <li className='w-40 h-14 flex items-center justify-center text-sm cursor:pointer border'>
            신규입력
          </li>
        </ul>
      </div>
      <p className='text-center text-sm text-[#A8A8A8] pt-24 pb-32'>
        등록된 배송지가 없습니다. <br />
        배송지를 신규입력 해주세요.
      </p>
    </section>
  );
};

export default ShippingInfo;
