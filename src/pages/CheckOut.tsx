import OrderProcess from 'components/OrderProcess';
import PaymentInfo from 'components/PaymentInfo';
import ProductInfo from 'components/ProductInfo';
import ShippingInfo from 'components/ShippingInfo';
import { useState } from 'react';
import { Receiver } from 'types/auth';

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
      <OrderProcess />
      <div className='flex justify-between px-12 pb-48'>
        <div className='relative w-1/2 min-w-[530px]'>
          <ShippingInfo
            receiver={receiver}
            setReceiver={setReceiver}
            address={address}
            setAddress={setAddress}
          />
          <ProductInfo />
        </div>
        <aside className='w-1/2 min-w-[370px] min-h-[1200px]'>
          <PaymentInfo receiver={receiver} address={address} />
        </aside>
      </div>
    </>
  );
};

export default CheckOut;
