import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useEffect, useState } from 'react';
import {
  Address,
  postcodeScriptUrl,
} from 'react-daum-postcode/lib/loadPostcode';
import { useAuthContext } from 'context/AuthContext';
import { useShippingQuery } from 'hooks/useShippingQuery';

const ShippingAddressForm = () => {
  const user = useAuthContext();
  const { address, saveAddressMutate } = useShippingQuery();
  const [zoneCode, setZoneCode] = useState<string>('');
  const [roadAddress, setRoadAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: Address) => {
    setZoneCode(data.zonecode);
    setRoadAddress(data.roadAddress);
  };

  const handleSave = () => {
    if (!zoneCode || !roadAddress || !detailAddress) return;
    const address = { zoneCode, roadAddress, detailAddress };
    saveAddressMutate({ uid: user?.uid as string, address });
  };

  useEffect(() => {
    if (address) {
      setZoneCode(address.zoneCode || '');
      setRoadAddress(address.roadAddress || '');
      setDetailAddress(address.detailAddress || '');
    }
  }, [address]);

  if (user?.isAdmin) return null;

  return (
    <div className='max-w-96'>
      <div className='text-sm text-[#303033]'>주소 정보</div>
      <div className='w-full flex items-center mt-2'>
        <input
          className='flex-1 h-10 px-3 font-semibold'
          type='text'
          placeholder='주소'
          value={zoneCode}
          readOnly
        />
        <button
          className='w-28 h-12 bg-gray-50 ml-2 text-xs text-[#303033]'
          onClick={() => open({ onComplete: handleComplete })}
        >
          우편번호 검색
        </button>
      </div>

      <div className='max-w-96 h-10 mt-3'>
        <input
          className='w-full h-full px-3'
          type='text'
          placeholder='주소'
          value={roadAddress}
          readOnly
        />
      </div>
      <div className='max-w-96 h-10 mt-3'>
        <input
          className='w-full h-full px-3'
          type='text'
          placeholder='상세 주소'
          onChange={(e) => setDetailAddress(e.target.value)}
          value={detailAddress}
        />
      </div>
      <button
        className='w-full h-12 text-sm bg-black text-white mt-5'
        onClick={handleSave}
      >
        저장하기
      </button>
    </div>
  );
};

export default ShippingAddressForm;
