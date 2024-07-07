import { useAuthContext } from 'context/AuthContext';
import { TabContextType, useTabContext } from 'context/TabContext';
import { useShippingQuery } from 'hooks/useShippingQuery';
import { useCallback, useEffect, useState } from 'react';
import { AuthContextType } from 'types/auth';

const OriginShippingForm = () => {
  const { address } = useShippingQuery();
  const { user } = useAuthContext() as AuthContextType;
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
  const { isComplete, setIsComplete, setUserAddress, setUserPhone } =
    useTabContext() as TabContextType;
  console.log('isComplete', isComplete);

  const handleChangePrimary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPrimaryPhone({ ...primaryPhone, [name]: value });
  };
  const handleChangeSecondary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSecondaryPhone({ ...secondaryPhone, [name]: value });
  };
  const updateIsComplete = useCallback(
    (shouldBeComplete: boolean) => {
      setIsComplete(shouldBeComplete);
    },
    [setIsComplete],
  );

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
    const isPhoneComplete =
      primaryPhone.part1.length >= 2 &&
      primaryPhone.part2.length >= 3 &&
      primaryPhone.part3.length === 4;
    const shouldBeComplete =
      address && (user?.displayName as string) && isPhoneComplete;
    if (isComplete !== shouldBeComplete) {
      //setIsComplete(shouldBeComplete as boolean);
      updateIsComplete(shouldBeComplete as boolean);
    }
  }, [address, user?.displayName, primaryPhone, isComplete, setIsComplete]);

  useEffect(() => {
    setUserPhone(
      `${primaryPhone.part1}-${primaryPhone.part2}-${primaryPhone.part3}`,
    );
  }, [primaryPhone]);

  if (!address) {
    return (
      <p className='text-center text-sm text-[#A8A8A8] pt-24 pb-32'>
        등록된 배송지가 없습니다. <br />
        배송지를 신규입력 해주세요.
      </p>
    );
  }

  return (
    <div className='pb-8'>
      <div className='flex pb-2'>
        <h2 className='flex w-32 text-sm pt-3'>
          수령인<i className='text-red-600'>*</i>
        </h2>
        <div className='flex flex-1 max-w-96'>
          <input
            type='text'
            className='w-full h-10 px-3 text-sm'
            defaultValue={user?.displayName ? user.displayName : ''}
          />
        </div>
      </div>
      <div className='flex pb-2'>
        <h2 className='w-32 text-sm pt-3'>
          배송지<i className='text-red-600'>*</i>
        </h2>
        <div className='flex flex-col flex-1'>
          <div className='flex pb-3 max-w-96'>
            <div className='w-2/3 h-10 border font-semibold px-3 py-2'>
              {address.zoneCode}
            </div>
          </div>
          <div className='pb-3'>
            <div className='border h-10 px-3 py-2'>{address.roadAddress}</div>
          </div>
          <div>
            <input
              type='text'
              className='w-full h-10 px-3'
              defaultValue={address.detailAddress}
              placeholder='상세주소 입력'
            />
          </div>
        </div>
      </div>
      <div className='flex pb-2'>
        <h2 className='w-32 text-sm'>
          연락처1<i className='text-red-600'>*</i>
        </h2>
        <div className='flex items-center flex-1'>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part1'
            pattern='[0-9]{3}'
            maxLength={4}
            onChange={handleChangePrimary}
            value={primaryPhone.part1}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part2'
            pattern='[0-9]{3,4}'
            maxLength={4}
            onChange={handleChangePrimary}
            value={primaryPhone.part2}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part3'
            pattern='[0-9]{4}'
            maxLength={4}
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
            pattern='[0-9]{3}'
            maxLength={4}
            onChange={handleChangeSecondary}
            value={secondaryPhone.part1}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part2'
            pattern='[0-9]{3,4}'
            maxLength={4}
            onChange={handleChangeSecondary}
            value={secondaryPhone.part2}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part3'
            pattern='[0-9]{4}'
            maxLength={4}
            onChange={handleChangeSecondary}
            value={secondaryPhone.part3}
          />
        </div>
      </div>
    </div>
  );
};

export default OriginShippingForm;
