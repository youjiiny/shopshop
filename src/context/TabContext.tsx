import { useContext, useState, createContext } from 'react';
import { Address } from 'types/auth';

export type TabContextType = {
  tab: 'origin' | 'new';
  setTab: (value: 'origin' | 'new') => void;
  isComplete: boolean;
  setIsComplete: (value: boolean) => void;
  userAddress: Address | undefined;
  setUserAddress: (value: Address | undefined) => void;
  userPhone: string;
  setUserPhone: (value: string) => void;
};

export const TabContext = createContext<TabContextType | null>(null);
export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [tab, setTab] = useState<'origin' | 'new'>('origin');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [userAddress, setUserAddress] = useState<Address>();
  const [userPhone, setUserPhone] = useState('');

  return (
    <TabContext.Provider
      value={{
        tab,
        setTab,
        isComplete,
        setIsComplete,
        userAddress,
        setUserAddress,
        userPhone,
        setUserPhone,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  return useContext(TabContext);
};
