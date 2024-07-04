import { TabContextType, useTabContext } from 'context/TabContext';
import { useCallback, useEffect, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import {
  Address,
  postcodeScriptUrl,
} from 'react-daum-postcode/lib/loadPostcode';

const NewShippingForm = () => {
  const [receiver, setReceiver] = useState<string>('');
  const [address, setAddress] = useState({
    zoneCode: '',
    roadAddress: '',
    detailAddress: '',
  });
  const [primaryPhone, setPrimaryPhone] = useState({
    part1: '',
    part2: '',
    part3: '',
  });
  const [secondaryPhone, setSecondaryPhone] = useState({
    part1: '',
    part2: '',
    part3: '',
  });
  const open = useDaumPostcodePopup(postcodeScriptUrl);
  const { isComplete, setIsComplete, setUserAddress, setUserPhone } =
    useTabContext() as TabContextType;

  const handleComplete = (data: Address) => {
    setAddress({
      ...address,
      zoneCode: data.zonecode,
      roadAddress: data.roadAddress,
    });
    setUserAddress({
      ...address,
      zoneCode: data.zonecode,
      roadAddress: data.roadAddress,
    });
  };
  const handleChangePrimary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPrimaryPhone({ ...primaryPhone, [name]: value });
    setUserPhone(
      `${primaryPhone.part1}-${primaryPhone.part2}-${primaryPhone.part3}`,
    );
  };
  const handleChangeSecondary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSecondaryPhone({ ...secondaryPhone, [name]: value });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, detailAddress: e.target.value });
    setUserAddress({ ...address, detailAddress: e.target.value });
  };

  const updateIsComplete = useCallback(
    (shouldBeComplete: boolean) => {
      setIsComplete(shouldBeComplete);
    },
    [setIsComplete],
  );

  useEffect(() => {
    const isPhoneComplete =
      primaryPhone.part1.length >= 3 &&
      primaryPhone.part2.length >= 3 &&
      primaryPhone.part3.length >= 4;
    const shouldBeComplete =
      address.zoneCode &&
      address.roadAddress &&
      address.detailAddress &&
      receiver.trim() &&
      isPhoneComplete;
    if (isComplete !== shouldBeComplete) {
      //setIsComplete(shouldBeComplete as boolean);
      updateIsComplete(shouldBeComplete as boolean);
    }
  }, [address, primaryPhone, receiver, isComplete, setIsComplete]);

  return (
    <div className='pb-8'>
      <div className='flex pb-2'>
        <h2 className='flex w-32 text-sm pt-3'>
          수령인
          <i className='text-red-600'>*</i>
        </h2>
        <div className='flex flex-1 max-w-96'>
          <input
            type='text'
            className='w-full h-10 px-3 text-sm'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setReceiver(e.target.value)
            }
            value={receiver}
          />
        </div>
      </div>
      <div className='flex pb-2'>
        <h2 className='w-32 text-sm pt-3'>
          배송지
          <i className='text-red-600'>*</i>
        </h2>
        <div className='flex flex-col flex-1'>
          <div className='flex items-center gap-2 pb-3 max-w-96'>
            <div className='h-10 border flex-1 font-semibold px-3 py-2'>
              {address.zoneCode}
            </div>
            <button
              className='w-28 h-12 bg-gray-50 ml-2 text-xs text-[#303033]'
              onClick={() => open({ onComplete: handleComplete })}
            >
              우편번호 검색
            </button>
          </div>
          <div className='pb-3'>
            <div className='border h-full min-h-10 px-3 py-2'>
              {address.roadAddress}
            </div>
          </div>
          <div>
            <input
              type='text'
              className='w-full h-10 px-3'
              value={address.detailAddress}
              placeholder='상세주소 입력'
              onChange={handleChange}
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
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part1'
            onChange={handleChangePrimary}
            value={primaryPhone.part1}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part2'
            onChange={handleChangePrimary}
            value={primaryPhone.part2}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part3'
            onChange={handleChangePrimary}
            value={primaryPhone.part3}
          />
        </div>
      </div>
      <div className='flex pb-2'>
        <h2 className='w-32 text-sm'>연락처2</h2>
        <div className='flex items-center flex-1'>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part1'
            onChange={handleChangeSecondary}
            value={secondaryPhone.part1}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part2'
            onChange={handleChangeSecondary}
            value={secondaryPhone.part2}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part3'
            onChange={handleChangeSecondary}
            value={secondaryPhone.part3}
          />
        </div>
      </div>
    </div>
  );
};

export default NewShippingForm;
