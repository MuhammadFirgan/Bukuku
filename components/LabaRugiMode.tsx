import { View, Text } from 'react-native'
import WrapText from './WrapText'
import { useEffect, useState } from 'react';
import { readBarang } from '@/utils/actions/persediaan.action';
import { readStock } from '@/utils/actions/stock.action';
import { Barang, StockLog } from '@/types';
import { formatRupiah } from '@/utils/libs';
import LaporanOperasional from './LaporanOperasional';

export default function LabaRugiMode() {
    const [totalPenjualan, setTotalPenjualan] = useState<number>(0);
    const [totalPengeluaran, setTotalPengeluaran] = useState<number>(0);
    const [totalKeuntungan, setTotalKeuntungan] = useState<number>(0);
    const [barangList, setBarangList] = useState<Barang[]>([]);
    const [stockList, setStockList] = useState<StockLog[]>([]);

    useEffect(() => {
        const computeKeuangan = async () => {
          try {
            const barang = await readBarang();
            const stock = (await readStock())?.items ?? [];
    
            setBarangList(barang);
            setStockList(stock);
    
            let penjualan = 0;
            let pengeluaran = 0;
    
            barang.forEach((b) => {
              const logBarang = stock.filter((log) => log.barang_id === b.id);
              const keluarLogs = logBarang.filter((log) => log.type === 'out');
              const masukLogs = logBarang.filter((log) => log.type === 'in');
    
              const totalKeluar = keluarLogs.reduce((sum, log) => sum + (log.amount ?? 0), 0);
              const totalMasuk = masukLogs.reduce((sum, log) => sum + (log.amount ?? 0), 0);
    
              penjualan += totalKeluar * b.harga_jual;
              pengeluaran += totalMasuk * b.harga_beli;
            });
    
            setTotalPenjualan(penjualan);
            setTotalPengeluaran(pengeluaran);
            setTotalKeuntungan(penjualan - pengeluaran);
          } catch (error) {
            console.error('❌ Error in computeKeuangan:', error);
          }
        };
    
        computeKeuangan();
      }, []);
 
  return (
    <View>
        <Text className='font-semibold text-lg mt-4 uppercase'>Pendapatan</Text>
        <WrapText 
            label='Total Pendapatan Kotor'
            value={totalPenjualan}
        />
        <WrapText 
            label='Total Modal'
            value={totalPengeluaran}
        />
        <WrapText 
            label='Total Keuntungan'
            value={totalKeuntungan}
        />
        <LaporanOperasional totalKeuntungan={totalKeuntungan}/>
    </View>
  )
}