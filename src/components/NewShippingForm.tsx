import { useDaumPostcodePopup } from 'react-daum-postcode';
import {
  Address,
  postcodeScriptUrl,
} from 'react-daum-postcode/lib/loadPostcode';
import { Receiver, Address as AddressType } from 'types/auth';

type Props = {
  receiver: Receiver;
  setReceiver: (value: Receiver) => void;
  address: AddressType;
  setAddress: (value: AddressType) => void;
};

const NewShippingForm = ({
  receiver,
  setReceiver,
  address,
  setAddress,
}: Props) => {
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: Address) => {
    setAddress({
      ...address,
      zoneCode: data.zonecode,
      roadAddress: data.roadAddress,
    });
  };
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, detailAddress: e.target.value });
  };

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
              setReceiver({ ...receiver, name: e.target.value })
            }
            value={receiver.name}
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
            value={receiver.phone1.part1}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part2'
            onChange={handleChangePrimary}
            value={receiver.phone1.part2}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part3'
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
            onChange={handleChangeSecondary}
            value={receiver.phone2.part1}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part2'
            onChange={handleChangeSecondary}
            value={receiver.phone2.part2}
          />
          <span className='w-5 text-center'>-</span>
          <input
            className='w-20 h-10 px-3'
            type='text'
            name='part3'
            onChange={handleChangeSecondary}
            value={receiver.phone2.part3}
          />
        </div>
      </div>
    </div>
  );
};

export default NewShippingForm;
