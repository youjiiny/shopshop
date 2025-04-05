import OrderProcess from 'components/OrderProcess';
import PaymentInfo from 'components/PaymentInfo';
import ProductInfo from 'components/ProductInfo';
import ShippingInfo from 'components/ShippingInfo';
import { useState } from 'react';
import { Receiver } from 'types/auth';
import MetaTag from 'components/MetaTag';

const CheckOut = () => {
  const [receiver, setReceiver] = useState<Receiver>({
    name: '',
    phone1: { part1: '', part2: '', part3: '' },
    phone2: { part1: '', part2: '', part3: '' },
  });
  const [address, setAddress] = useState({
    zoneCode: '',
    roadAddress: '',
    detailAddress: '',
  });

  return (
    <>
      <MetaTag title='주문하기 - Shopshop' />
      <div className='px-5 pb-12 md:px-12 md:pb-48'>
        <OrderProcess />
        <div className='(flex flex-col) lg:flex lg:justify-between'>
          <div className='w-full pt-5 pb-7 md:pt-0 lg:relative lg:w-1/2 lg:min-w-[530px]'>
            <ShippingInfo
              receiver={receiver}
              setReceiver={setReceiver}
              address={address}
              setAddress={setAddress}
            />
            <ProductInfo />
          </div>
          <aside className='w-full lg:w-1/2 lg:min-w-[370px] lg:min-h-[1200px]'>
            <PaymentInfo receiver={receiver} address={address} />
          </aside>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
