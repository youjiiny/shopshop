import { useContext, useState, createContext } from 'react';

export type TabContextType = {
  tab: 'origin' | 'new';
  setTab: (value: 'origin' | 'new') => void;
  isComplete: boolean;
  setIsComplete: (value: boolean) => void;
};

export const TabContext = createContext<TabContextType | null>(null);
export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [tab, setTab] = useState<'origin' | 'new'>('origin');
  const [isComplete, setIsComplete] = useState<boolean>(false);

  return (
    <TabContext.Provider value={{ tab, setTab, isComplete, setIsComplete }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  return useContext(TabContext);
};
