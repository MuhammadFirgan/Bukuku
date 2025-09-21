import { useEffect } from "react";
import { useFooter } from "../context/FooterContext";
import { useHeaderTitle } from "../context/HeaderContext";
import { persediaan$ } from "../states/PesediaanState";
import { stock$ } from "../states/stockState";


const stockLogs = Object.values(stock$.get() ?? {});
const barangList = Object.values(persediaan$.get() ?? {});


export const totalStok = barangList.reduce((acc, item) => acc + (item.quantity || 0), 0);


export const totalMasuk = stockLogs
  .filter((log) => log.type === 'in')
  .reduce((acc, log) => acc + log.amount, 0);


export const totalKeluar = stockLogs
  .filter((log) => log.type === 'out')
  .reduce((acc, log) => acc + log.amount, 0);


export function usePageSetup(
  title: string | React.ReactNode,
  showFooter: boolean = false,
  footerContent?: React.ReactNode
) {
  const { setTitle } = useHeaderTitle();
  const { setShowFooter, setFooterContent } = useFooter();

  useEffect(() => {

    setTitle(title as string);
    setShowFooter(showFooter);

    if (footerContent !== undefined) {
      setFooterContent(footerContent);
    } else {
      setFooterContent(null); 
    }
  }, [title, showFooter, footerContent, setTitle, setShowFooter, setFooterContent]);
}

export const formatRupiah = (value: number): string =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
  
