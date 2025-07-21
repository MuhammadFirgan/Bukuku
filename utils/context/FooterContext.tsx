// context/FooterContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type FooterContextType = {
  showFooter: boolean;
  footerContent: ReactNode;
  setShowFooter: (value: boolean) => void;
  setFooterContent: (content: ReactNode) => void;
};

const FooterContext = createContext<FooterContextType>({
  showFooter: false,
  footerContent: null,
  setShowFooter: () => {},
  setFooterContent: () => {},
});

export const FooterProvider = ({ children }: { children: ReactNode }) => {
  const [showFooter, setShowFooter] = useState(false);
  const [footerContent, setFooterContent] = useState<ReactNode>(null);

  return (
    <FooterContext.Provider
      value={{ showFooter, footerContent, setShowFooter, setFooterContent }}
    >
      {children}
    </FooterContext.Provider>
  );
};

export const useFooter = () => useContext(FooterContext);
