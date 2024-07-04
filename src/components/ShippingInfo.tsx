import { TabContextType, useTabContext } from 'context/TabContext';
import OriginShippingForm from './OriginShippingForm';
import NewShippingForm from './NewShippingForm';

const ShippingInfo = () => {
  const { tab, setTab, setIsComplete, setUserAddress, setUserPhone } =
    useTabContext() as TabContextType;
  const handleClick = (tab: 'origin' | 'new') => {
    setTab(tab);
    setIsComplete(false);
    setUserAddress(undefined);
    setUserPhone('');
  };

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
            className={`w-40 h-14 flex items-center justify-center text-sm cursor:pointer border ${tab === 'origin' ? 'bg-white' : 'bg-gray-100 text-slate-400'}`}
            onClick={() => handleClick('origin')}
          >
            기존 배송지
          </li>
          <li
            className={`w-40 h-14 flex items-center justify-center text-sm cursor:pointer border ${tab === 'new' ? 'bg-white' : 'bg-gray-100 text-slate-400'}`}
            onClick={() => handleClick('new')}
          >
            신규입력
          </li>
        </ul>
      </div>
      {tab === 'origin' ? <OriginShippingForm /> : <NewShippingForm />}
    </section>
  );
};

export default ShippingInfo;
