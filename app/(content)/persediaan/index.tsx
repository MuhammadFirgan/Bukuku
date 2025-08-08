import CountCard from '@/components/CountCard';
import CreateFormLayout from '@/components/CreateFormLayout';
import ListItems from '@/components/ListItems';
import { readBarang } from '@/utils/actions/persediaan.action';
import { readStock } from '@/utils/actions/stock.action';
import { stockEvents } from '@/utils/event/stock.event';
import { usePageSetup } from '@/utils/libs';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Barang, StockLog } from '@/types';

// Fungsi debounce manual dengan tipe
const debounce = (func: (query: string) => void, delay: number) => {
  let timeoutId: number | undefined;
  return (query: string) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(query), delay);
  };
};

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [listBarang, setListBarang] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stockList, setStockList] = useState<StockLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  usePageSetup('Persediaan', false);

  const fetchStock = async () => {
    try {
      const result = await readStock();
      if (!result) return;
      const sorted = Object.values(result.items).sort(
        (a: StockLog, b: StockLog) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      );
      setStockList(sorted as StockLog[]);
    } catch (err) {
      console.error('❌ Error fetching stock:', err);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await readBarang();
      setListBarang(result);
    } catch (err) {
      setError('Gagal memuat data barang');
      console.error('❌ Error fetching barang:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
    fetchData();
    stockEvents.on(fetchStock);
    stockEvents.on(fetchData);
    return () => {
      stockEvents.off(fetchStock);
      stockEvents.off(fetchData);
    };
  }, []);

  // Filter barang berdasarkan searchQuery
  const filteredBarang = useMemo(() => {
    if (!searchQuery.trim()) return listBarang;
    const query = searchQuery.toLowerCase();
    return listBarang.filter((item) =>
      item.nama_barang?.toLowerCase().includes(query)
    );
  }, [listBarang, searchQuery]);

  // Handler untuk search dengan debounce
  const handleSearchChange = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    
    }, 300),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const totalMasuk = useMemo(
    () => stockList.filter((item) => item.type === 'in').reduce((acc, item) => acc + (item.amount || 0), 0),
    [stockList]
  );

  const totalKeluar = useMemo(
    () => stockList.filter((item) => item.type === 'out').reduce((acc, item) => acc + (item.amount || 0), 0),
    [stockList]
  );

  const totalQuantity = useMemo(
    () => listBarang.reduce((total, item) => total + Number(item.quantity || 0), 0),
    [listBarang]
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="mt-2 text-gray-600">Memuat data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="w-full flex-1">
      <View className="flex flex-row flex-wrap -mt-14 px-7">
        <CountCard label="Persediaan" value={totalQuantity.toString()} />
        <CountCard label="Barang" value={listBarang.length.toString()} />
        <CountCard label="Barang Masuk" value={totalMasuk.toString()} />
        <CountCard label="Barang Keluar" value={totalKeluar.toString()} />
      </View>
      <View className="flex flex-row items-center gap-4 pt-8 px-7 mb-5">
        <View className="relative">
          <EvilIcons name="search" size={24} color="black" className="absolute top-1/2 -translate-y-4 left-3" />
          <TextInput
            className="border border-gray-400 w-72 rounded-xl pl-10 pr-2 py-1 text-black"
            placeholder="Search..."
            onChangeText={handleSearchChange}
          />
        </View>
        <TouchableOpacity
          className="p-3 bg-primary rounded-xl mr-4"
          onPress={() => setModalOpen(!modalOpen)}
        >
          <Text className="text-white">Tambah Barang</Text>
        </TouchableOpacity>
        <CreateFormLayout visible={modalOpen} onClose={() => setModalOpen(false)} />
      </View>

      <View className="flex-1">
        <FlatList
          data={filteredBarang}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 50 }}
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-4">Tidak ada barang ditemukan</Text>
          }
          renderItem={({ item }) => (
            <ListItems
              id={item.id}
              name={item.nama_barang}
              price={item.harga_jual - item.harga_beli}
              stock={item.quantity}
            />
          )}
        />
      </View>
    </View>
  );
}