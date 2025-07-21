import { useEffect } from "react";
import { useFooter } from "../context/FooterContext";
import { useHeaderTitle } from "../context/HeaderContext";
import { persediaan$ } from "../states/PesediaanState";
import { stock$ } from "../states/stockState";

// Ambil semua data dengan fallback jika undefined
const stockLogs = Object.values(stock$.get() ?? {});
const barangList = Object.values(persediaan$.get() ?? {});

// Total barang sekarang
export const totalStok = barangList.reduce((acc, item) => acc + (item.quantity || 0), 0);

// Total barang masuk
export const totalMasuk = stockLogs
  .filter((log) => log.type === 'in')
  .reduce((acc, log) => acc + log.amount, 0);

// Total barang keluar
export const totalKeluar = stockLogs
  .filter((log) => log.type === 'out')
  .reduce((acc, log) => acc + log.amount, 0);

export function usePageSetup(title: string, footerContent?: React.ReactNode) {
  const { setTitle } = useHeaderTitle();
  const { setShowFooter, setFooterContent } = useFooter();

  useEffect(() => {
    setTitle(title);
    if (footerContent !== undefined) {
      setShowFooter(true);
      setFooterContent(footerContent);
    } else {
      setShowFooter(false);
    }
  }, [title, footerContent, setTitle, setShowFooter, setFooterContent]);
}