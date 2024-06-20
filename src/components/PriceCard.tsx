type Props = { text: string; price: number };
export const PriceCard = ({ text, price }: Props) => {
  return (
    <div className='text-center pt-3'>
      <p className='text-lg font-bold'>{text}</p>
      <span className='text-xl md:text-2xl text-price-stress'>
        <strong>{price.toLocaleString()}</strong>원
      </span>
    </div>
  );
};
