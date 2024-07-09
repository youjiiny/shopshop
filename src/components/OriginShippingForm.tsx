import { useAuthContext } from 'context/AuthContext';
import { useShippingQuery } from 'hooks/useShippingQuery';
import { useEffect } from 'react';
import { Address, AuthContextType, Receiver } from 'types/auth';

type Props = {
  receiver: Receiver;
  setReceiver: (value: Receiver) => void;
  address: Address;
  setAddress: (value: Address) => void;
};

const OriginShippingForm = ({ receiver, setReceiver, setAddress }: Props) => {
  const { address } = useShippingQuery();
  const { user } = useAuthContext() as AuthContextType;

  const handleChangePrimary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const shallow = { ...receiver };
    shallow.phone1 = {
      ...receiver.phone1,
      [name]: value,
    };
    setReceiver(shallow);
  };
  const handleChangeSecondary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const shallow = { ...receiver };
    shallow.phone2 = {
      ...receiver.phone2,
      [name]: value,
    };
    setReceiver(shallow);
  };

  useEffect(() => {
    if (user?.displayName) {
      setReceiver({ ...receiver, name: user?.displayName });
    }
    if (address?.zoneCode) {
      setAddress(address);
    }
  }, [address?.zoneCode, user?.displayName]);

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
            value={receiver.phone1.part1}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part2'
            pattern='[0-9]{3,4}'
            maxLength={4}
            onChange={handleChangePrimary}
            value={receiver.phone1.part2}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part3'
            pattern='[0-9]{4}'
            maxLength={4}
            onChange={handleChangePrimary}
            value={receiver.phone1.part3}
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
            value={receiver.phone2.part1}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part2'
            pattern='[0-9]{3,4}'
            maxLength={4}
            onChange={handleChangeSecondary}
            value={receiver.phone2.part2}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part3'
            pattern='[0-9]{4}'
            maxLength={4}
            onChange={handleChangeSecondary}
            value={receiver.phone2.part3}
          />
        </div>
      </div>
    </div>
  );
};

export default OriginShippingForm;
