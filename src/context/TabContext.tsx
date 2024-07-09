import { useContext, useState, createContext } from 'react';

export type TabContextType = {
  tab: 'origin' | 'new';
  setTab: (value: 'origin' | 'new') => void;
};

export const TabContext = createContext<TabContextType | null>(null);
export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [tab, setTab] = useState<'origin' | 'new'>('origin');

  return (
    <TabContext.Provider
      value={{
        tab,
        setTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  return useContext(TabContext);
};
