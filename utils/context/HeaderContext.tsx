import { createContext, useContext, useState } from 'react';

type HeaderTitleContextType = {
  title: string;
  setTitle: (title: string) => void;
};

const HeaderTitleContext = createContext<HeaderTitleContextType>({
  title: 'Persediaan',
  setTitle: () => {},
});

export const HeaderTitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState('Persediaan');

  return (
    <HeaderTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </HeaderTitleContext.Provider>
  );
};

export const useHeaderTitle = () => useContext(HeaderTitleContext);
