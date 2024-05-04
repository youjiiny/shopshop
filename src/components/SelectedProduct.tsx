import { SelectedProductQuantity } from './SelectedProductQuantity';

export const SelectedProduct = ({ option }: { option: string[] }) => {
  return (
    <ul>
      {option.map((option, i) => (
        <SelectedProductQuantity key={i} option={option} />
      ))}
    </ul>
  );
};
