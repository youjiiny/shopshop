import { SelectedProductQuantity } from './SelectedProductQuantity';
import TotalPrice from './TotalPrice';

export const SelectedProduct = ({ option }: { option: string[] }) => {
  return (
    <>
      <ul>
        {option.map((option, i) => (
          <SelectedProductQuantity key={i} option={option} />
        ))}
      </ul>
      <TotalPrice />
    </>
  );
};
