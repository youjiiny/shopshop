import SelectedOptionModal from 'components/SelectedOptionModal';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { useModalStore } from 'store/modal';
import { ProductCountContextType, ProductSize } from 'types/product';

export const ProductCountContext =
  createContext<ProductCountContextType | null>(null);
export const ProductCountProvider = ({ children }: { children: ReactNode }) => {
  const [size, setSize] = useState<string[]>([]);
  const [selected, setSelected] = useState<ProductSize | null>(null);
  const [price, setPrice] = useState<number>(0);
  const { id } = useParams();
  const { openModal } = useModalStore();

  const selectProduct = (option: string) => {
    if (size.includes(option)) {
      openModal(<SelectedOptionModal />);
      return;
    }
    setSize((size) => [...size, option]);
    setSelected((selected) => ({ ...selected, [option]: 1 }));
  };
  const deleteSize = (deleted: string) => {
    setSize(size.filter((op) => op !== deleted));
    const { [deleted]: _, ...selectedSize } = selected!;
    if (JSON.stringify(selectedSize) === '{}') {
      setSelected(null);
      return;
    }
    setSelected(selectedSize);
  };
  const addCount = (size: string) =>
    setSelected({ ...selected, [size]: selected![size] + 1 });
  const minusCount = (size: string) => {
    if (selected![size] <= 1) return;
    setSelected({ ...selected, [size]: selected![size] - 1 });
  };

  useEffect(() => {
    if (id) {
      setSize([]);
      setSelected(null);
      setPrice(0);
    }
  }, [id]);

  return (
    <ProductCountContext.Provider
      value={{
        size,
        selected,
        price,
        setPrice,
        selectProduct,
        deleteSize,
        addCount,
        minusCount,
      }}
    >
      {children}
    </ProductCountContext.Provider>
  );
};

export const useProductCountContext = () => {
  return useContext(ProductCountContext);
};
