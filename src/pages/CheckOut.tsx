import OrderProcess from 'components/OrderProcess';
import PaymentInfo from 'components/PaymentInfo';
import ProductInfo from 'components/ProductInfo';
import ShippingInfo from 'components/ShippingInfo';

const CheckOut = () => {
  return (
    <>
      <OrderProcess />
      <div className='flex justify-between px-12 pb-48'>
        <div className='relative w-1/2 min-w-[530px]'>
          <ShippingInfo />
          <ProductInfo />
        </div>
        <aside className='w-1/2 min-w-[370px] min-h-[1200px]'>
          <PaymentInfo />
        </aside>
      </div>
    </>
  );
};

export default CheckOut;
