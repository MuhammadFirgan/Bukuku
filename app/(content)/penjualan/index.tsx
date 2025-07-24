import { View, Text, TextInput, Dimensions, FlatList } from 'react-native'
import { usePageSetup } from '@/utils/libs'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import ListPenjualan from '@/components/ListPenjualan';
import { useEffect, useState } from 'react';
import { readBarang } from '@/utils/actions/persediaan.action';
import { readStock } from '@/utils/actions/stock.action';
import { HistoryItem, StockLog } from '@/types';
import HistoryLayout from '@/components/HistoryLayout';

export default function Index() {
  const [totalPenjualan, setTotalPenjualan] = useState<number>(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState<number>(0);
  const [totalKeuntungan, setTotalKeuntungan] = useState<number>(0);
  const [historyPenjualan, setHistoryPenjualan] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const computeKeuangan = async () => {
      const barangList = await readBarang();
      const stockResult = readStock();
      const stockList = stockResult?.items ?? [];

      let penjualan = 0;
      let pengeluaran = 0;

      let historyMap: Record<string, HistoryItem> = {};

      barangList.forEach((barang) => {
        const logBarang = stockList.filter((log: StockLog) => log.barang_id === barang.id);

        const keluarLogs = logBarang.filter((log: StockLog) => log.type === 'out');
        const masukLogs = logBarang.filter((log: StockLog) => log.type === 'in');

        const totalKeluar = keluarLogs.reduce((sum, log) => sum + (log.amount ?? 0), 0);
        const totalMasuk = masukLogs.reduce((sum, log) => sum + (log.amount ?? 0), 0);

        penjualan += totalKeluar * barang.harga_jual;
        pengeluaran += totalMasuk * barang.harga_beli;

        if (keluarLogs.length > 0) {
          if (historyMap[barang.id]) {
            historyMap[barang.id].amount += totalKeluar;
            historyMap[barang.id].subtotal += totalKeluar * barang.harga_jual;
          } else {
            historyMap[barang.id] = {
              id: barang.id,
              nama_barang: barang.nama_barang,
              amount: totalKeluar,
              harga_jual: barang.harga_jual,
              subtotal: totalKeluar * barang.harga_jual,
            };
          }
        }
      });

      setTotalPenjualan(penjualan);
      setTotalPengeluaran(pengeluaran);
      setTotalKeuntungan(penjualan - pengeluaran);
      setHistoryPenjualan(Object.values(historyMap));
    };

    computeKeuangan();
  }, []);

  usePageSetup('Penjualan', true);
  const { width } = Dimensions.get('window');
  const boxWidth = width * 0.9;

  return (
    <View>
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

      <View className='flex justify-center items-center my-5'>
        <View className='relative'>
          <EvilIcons name="search" size={24} color="#9ca3af" className='absolute top-1/2 -translate-y-1/2 left-3 z-50' />
          <TextInput className='border border-gray-400 w-72 rounded-xl placeholder:pl-10 bg-white' placeholder='Search...' />
        </View>
      </View>

      <HistoryLayout 
        width={width}
        boxWidth={boxWidth}
        totalPenjualan={totalPenjualan}
        historyPenjualan={historyPenjualan}
      />

      {/* <View className='relative'>
        <View className='absolute top-1/2 h-[400px] z-50 py-5 bg-white rounded-lg' style={{
          width: boxWidth,
          left: width / 2,
          transform: [{ translateX: -boxWidth / 2 }],
        }}>
          <View className='border-b pb-4 border-gray-300'>
            <View className='px-5 flex justify-between items-center flex-row'>
              <Text className="font-semibold">Penjualan</Text>
              <Text className='text-primary'>Rp {totalPenjualan.toLocaleString('id-ID')}</Text>
            </View>
          </View>

          <Text className='px-5 font-semibold pt-3'>Items</Text>
          <View className='w-12 bg-primary h-1 mx-4'></View>

          <FlatList
            data={historyPenjualan}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListPenjualan
                nama_barang={item.nama_barang}
                amount={item.amount}
                harga_jual={item.harga_jual}
              />
            )}
            ListEmptyComponent={
              <Text className='text-center text-gray-400 mt-4'>Belum ada penjualan</Text>
            }
          />
        </View>
      </View> */}
    </View>
  )
}
