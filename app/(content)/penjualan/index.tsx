import { View, Text, TextInput, Dimensions } from 'react-native'
import { usePageSetup } from '@/utils/libs'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { useEffect, useState } from 'react';
import { readBarang } from '@/utils/actions/persediaan.action';
import { readStock } from '@/utils/actions/stock.action';
import { Barang, StockLog } from '@/types';
import HistoryLayout from '@/components/HistoryLayout';
import { createHistory } from '@/utils/actions/history.action';

export default function Index() {
  const [totalPenjualan, setTotalPenjualan] = useState<number>(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState<number>(0);
  const [totalKeuntungan, setTotalKeuntungan] = useState<number>(0);
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [stockList, setStockList] = useState<StockLog[]>([]);

  useEffect(() => {
    const computeKeuangan = async () => {
      const barang = await readBarang();
      const stock = readStock()?.items ?? [];

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
    };

    computeKeuangan();
  }, []);

  usePageSetup('Penjualan', true);
  const { width } = Dimensions.get('window');
  const boxWidth = width * 0.9;

  return (
    <View>
      {/* Informasi keuangan */}
      <View className='bg-white mx-4 -mt-8 rounded-lg px-5 py-4'>
        <Text className='font-semibold text-xl'>INFORMASI</Text>
        <View className='bg-primary w-32 h-1 mt-2'></View>

        <View className='flex flex-row items-center mt-7 justify-between'>
          <View className='flex flex-row items-center justify-between w-3/4'>
            <Text className='text-xs'>Penjualan Bulanan</Text>
            <Text className='text-xs text-gray-500 '>Total Pendapatan Kotor</Text>
          </View>
          <Text className='text-xs text-primary'>Rp {totalPenjualan.toLocaleString('id-ID')}</Text>
        </View>

        <View className='flex flex-row items-center mt-7 justify-between'>
          <View className='flex flex-row items-center justify-between gap-8 w-3/4'>
            <Text className='text-xs'>Modal yang Dikeluarkan</Text>
            <Text className='text-xs text-gray-500'>Total Modal</Text>
          </View>
          <Text className='text-xs text-red-500'>Rp {totalPengeluaran.toLocaleString('id-ID')}</Text>
        </View>

        <View className='flex flex-row items-center mt-7 justify-between'>
          <View className='flex flex-row items-center justify-between gap-8 w-3/4'>
            <Text className='text-xs'>Keuntungan</Text>
            <Text className='text-xs text-gray-500'>Total Keuntungan</Text>
          </View>
          <Text className='text-xs text-primary'>Rp {totalKeuntungan.toLocaleString('id-ID')}</Text>
        </View>

        <View className='flex flex-row justify-end'>
          <View className='bg-primary w-20 h-1 mt-2'></View>
        </View>
      </View>

      {/* Search */}
      <View className='flex justify-center items-center my-5'>
        <View className='relative'>
          <EvilIcons name="search" size={24} color="#9ca3af" className='absolute top-1/2 -translate-y-1/2 left-3 z-50' />
          <TextInput className='border border-gray-400 w-72 rounded-xl placeholder:pl-10 bg-white' placeholder='Search...' />
        </View>
      </View>

      {/* History penjualan */}
      <HistoryLayout
        width={width}
        boxWidth={boxWidth}
        barangList={barangList}
        stockList={stockList}
      />
    </View>
  );
}
