import ArrowSvg from 'assets/svg/ArrowSvg';
import { useLocation } from 'react-router-dom';

const OrderProcess = () => {
  const { pathname } = useLocation();
  const process = ['01 SHOPPING BAG', '02 ORDER', '03 ORDER CONFIRMED'];
  const fontBold = (index: number) => {
    if (pathname === '/carts' && index === 0) {
      return 'font-bold';
    }
    if (pathname === '/checkout' && index === 1) {
      return 'font-bold';
    }
    return '';
  };
  return (
    <div className='hidden md:visible md:flex justify-center pt-20 pb-24'>
      <ol className='flex gap-2 text-[15px]'>
        {process.map((p, i) => (
          <li key={i} className={`flex items-center gap-2 ${fontBold(i)}`}>
            {p}
            {i !== process.length - 1 && <ArrowSvg width={8} height={16} />}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default OrderProcess;
