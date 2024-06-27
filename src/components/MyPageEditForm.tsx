import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';
import SideBar from './SideBar';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useState } from 'react';
import { set } from 'react-hook-form';

const MyPageEditForm = () => {
  const [isOpen, setIsOepn] = useState(false);
  const [zoneCode, setZoneCode] = useState<string>('');
  const [roadAddress, setRoadAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const handleComplete = (data: any) => {
    console.log('data', data);
    setZoneCode(data.zonecode);
    setRoadAddress(data.roadAddress);
  };
  return (
    <div className='w-full'>
      <div className='max-w-96'>
        <div className='w-full flex items-center'>
          <input
            className='flex-1 h-10  px-3'
            type='text'
            placeholder='주소'
            value={zoneCode}
          />
          <button
            className='w-28 h-12 bg-gray-50 ml-2 text-xs text-[#303033]'
            onClick={() => setIsOepn(true)}
          >
            우편번호 검색
          </button>
        </div>
        {isOpen && <DaumPostcodeEmbed onComplete={handleComplete} />}

        <div className='max-w-96 h-10 mt-3'>
          <input
            className='w-full h-full px-3'
            type='text'
            placeholder='주소'
            value={roadAddress}
            disabled
          />
        </div>
        <div className='max-w-96 h-10 mt-3'>
          <input
            className='w-full h-full px-3'
            type='text'
            placeholder='상세 주소'
            value={detailAddress}
          />
        </div>
        <button className='w-full h-12 text-sm bg-black text-white mt-5'>
          저장하기
        </button>
      </div>
    </div>
  );
};

export default MyPageEditForm;
