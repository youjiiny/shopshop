import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { ProductCountContextType, ProductSize } from 'types/product';

export const ProductCountContext =
  createContext<ProductCountContextType | null>(null);
export const ProductCountProvider = ({ children }: { children: ReactNode }) => {
  const [size, setSize] = useState<string[]>([]);
  const [selected, setSelected] = useState<ProductSize | null>(null);
  const [price, setPrice] = useState<number>(0);
  const { id } = useParams();

  const selectSize = (selected: string) => {
    if (size.includes(selected)) {
      alert('이미 선택된 옵션입니다');
      return;
    }
    setSize((size) => [...size, selected]);
  };
  const selectProduct = (size: string) => {
    if (selected?.size) return;
    setSelected((selected) => ({ ...selected, [size]: 1 }));
  };
  console.log('selected', selected);
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
        selectSize,
        selectProduct,
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
