import { View, Text, TextInput, Dimensions } from 'react-native';
import { usePageSetup } from '@/utils/libs';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { readBarang } from '@/utils/actions/persediaan.action';
import { readStock } from '@/utils/actions/stock.action';
import { Barang, StockLog } from '@/types';
import HistoryLayout from '@/components/HistoryLayout';

// Fungsi debounce manual
const debounce = (func: (query: string) => void, delay: number) => {
  let timeoutId: number | undefined;
  return (query: string) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(query), delay);
  };
};

export default function Index() {
  const [totalPenjualan, setTotalPenjualan] = useState<number>(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState<number>(0);
  const [totalKeuntungan, setTotalKeuntungan] = useState<number>(0);
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [stockList, setStockList] = useState<StockLog[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  // Filter barang berdasarkan searchQuery
  const filteredBarangList = useMemo(() => {
    if (!searchQuery.trim()) return barangList;
    const query = searchQuery.toLowerCase();
    return barangList.filter((item) =>
      item.nama_barang?.toLowerCase().includes(query)
    );
  }, [barangList, searchQuery]);

  // Handler untuk search dengan debounce
  const handleSearchChange = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  usePageSetup('Penjualan', true);
  const { width } = Dimensions.get('window');
  const boxWidth = width * 0.9;

  return (
    <View>
      {/* Informasi keuangan */}
      <View className="bg-white mx-4 -mt-8 rounded-lg px-5 py-4">
        <Text className="font-semibold text-xl">INFORMASI</Text>
        <View className="bg-primary w-32 h-1 mt-2"></View>

        <View className="flex flex-row items-center mt-7 justify-between">
          <View className="flex flex-row items-center justify-between w-3/4">
            <Text className="text-xs">Penjualan Bulanan</Text>
            <Text className="text-xs text-gray-500">Total Pendapatan Kotor</Text>
          </View>
          <Text className="text-xs text-primary">Rp {totalPenjualan.toLocaleString('id-ID')}</Text>
        </View>

        <View className="flex flex-row items-center mt-7 justify-between">
          <View className="flex flex-row items-center justify-between gap-8 w-3/4">
            <Text className="text-xs">Modal yang Dikeluarkan</Text>
            <Text className="text-xs text-gray-500">Total Modal</Text>
          </View>
          <Text className="text-xs text-red-500">Rp {totalPengeluaran.toLocaleString('id-ID')}</Text>
        </View>

        <View className="flex flex-row items-center mt-7 justify-between">
          <View className="flex flex-row items-center justify-between gap-8 w-3/4">
            <Text className="text-xs">Keuntungan</Text>
            <Text className="text-xs text-gray-500">Total Keuntungan</Text>
          </View>
          <Text className="text-xs text-primary">Rp {totalKeuntungan.toLocaleString('id-ID')}</Text>
        </View>

        <View className="flex flex-row justify-end">
          <View className="bg-primary w-20 h-1 mt-2"></View>
        </View>
      </View>

      {/* Search */}
      <View className="flex justify-center items-center my-5">
        <View className="relative">
          <EvilIcons
            name="search"
            size={24}
            color="#9ca3af"
            className="absolute top-1/2 -translate-y-1/2 left-3 z-50"
          />
          <TextInput
            className="border border-gray-400 w-72 rounded-xl pl-10 pr-2 py-1 bg-white"
            placeholder="Search..."
            onChangeText={handleSearchChange}
          />
        </View>
      </View>

      {/* History penjualan */}
      <HistoryLayout
        width={width}
        boxWidth={boxWidth}
        barangList={filteredBarangList}
        stockList={stockList}
      />
    </View>
  );
}