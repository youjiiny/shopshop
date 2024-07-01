const NewShippingForm = () => {
  return (
    <div className='pb-8'>
      <div className='flex pb-2'>
        <h2 className='flex w-32 text-sm pt-3'>
          수령인
          <i className='text-red-600'>*</i>
        </h2>
        <div className='flex flex-1'>
          <input
            type='text'
            className='w-full h-10 px-3 text-sm'
            // defaultValue={user?.displayName ? user.displayName : ''}
          />
        </div>
      </div>
      <div className='flex pb-2'>
        <h2 className='w-32 text-sm pt-3'>
          배송지
          <i className='text-red-600'>*</i>
        </h2>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-2 pb-3 max-w-96'>
            <div className='border flex-1 font-semibold px-3 py-2'>
              {/* {address.zoneCode} */}
            </div>
            <button className='w-28 h-12 bg-gray-50 ml-2 text-xs text-[#303033]'>
              우편번호 검색
            </button>
          </div>
          <div className='pb-3'>
            <div className='border h-full min-h-10 px-3 py-2'>
              {/* {address.roadAddress} */}
            </div>
          </div>
          <div>
            <input
              type='text'
              className='w-full h-10 px-3'
              //   defaultValue={address.detailAddress}
              placeholder='상세주소 입력'
            />
          </div>
        </div>
      </div>
      <div className='flex pb-2'>
        <h2 className='w-32 text-sm'>
          연락처1
          <i className='text-red-600'>*</i>
        </h2>
        <div className='flex items-center flex-1'>
          <input className='w-20 h-10 px-3' type='text' />
          <span className='w-5 text-center'>-</span>
          <input className='w-20 h-10 px-3' type='text' />
          <span className='w-5 text-center'>-</span>
          <input className='w-20 h-10 px-3' type='text' />
        </div>
      </div>
      <div className='flex pb-2'>
        <h2 className='w-32 text-sm'>연락처2</h2>
        <div className='flex items-center flex-1'>
          <input className='w-20 h-10 px-3' type='text' />
          <span className='w-5 text-center'>-</span>
          <input className='w-20 h-10 px-3' type='text' />
          <span className='w-5 text-center'>-</span>
          <input className='w-20 h-10 px-3' type='text' />
        </div>
      </div>
    </div>
  );
};

export default NewShippingForm;
