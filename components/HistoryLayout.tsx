import { Barang, HistoryItem, StockLog } from '@/types';
import { createHistory } from '@/utils/actions/history.action';
import { generateId } from '@/utils/SupaLegend';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import ListPenjualan from './ListPenjualan';

type Props = {
  width: number;
  boxWidth: number;
  barangList: Barang[];
  stockList: StockLog[];
};

export default function HistoryLayout({ width, boxWidth, barangList, stockList }: Props) {
  const [historyPenjualan, setHistoryPenjualan] = useState<HistoryItem[]>([]);
  const [totalPenjualan, setTotalPenjualan] = useState<number>(0);

  useEffect(() => {
    let historyMap: Record<string, HistoryItem> = {};
    let total = 0;

   

    barangList.forEach((barang) => {
      const logBarang = stockList.filter((log) => log.barang_id === barang.id);
      const keluarLogs = logBarang.filter((log) => log.type === 'out');
      const totalKeluar = keluarLogs.reduce((sum, log) => sum + (log.amount ?? 0), 0);
      const subtotal = totalKeluar * barang.harga_jual;

      // Tambahkan semua barang, bahkan jika totalKeluar = 0
      const item: HistoryItem = {
        id: generateId(),
        barang_id: barang.id,
        nama_barang: barang.nama_barang,
        amount: totalKeluar,
        harga_jual: barang.harga_jual,
        subtotal,
      };

      createHistory(item);
      historyMap[barang.id] = item;
      total += subtotal;

      console.log(`History item untuk ${barang.nama_barang}:`, item); // Log untuk debugging
    });

    setTotalPenjualan(total);
    setHistoryPenjualan(Object.values(historyMap));
    console.log('Jumlah history penjualan:', Object.keys(historyMap).length); // Log jumlah history
  }, [barangList, stockList]);

  return (
    <View className="relative">
      <View
        className="absolute top-1/2 h-[400px] z-50 py-5 bg-white rounded-lg"
        style={{
          width: boxWidth,
          left: width / 2,
          transform: [{ translateX: -boxWidth / 2 }],
        }}
      >
        <View className="border-b pb-4 border-gray-300">
          <View className="px-5 flex justify-between items-center flex-row">
            <Text className="font-semibold">Penjualan</Text>
            <Text className="text-primary">Rp {totalPenjualan.toLocaleString('id-ID')}</Text>
          </View>
        </View>

        <Text className="px-5 font-semibold pt-3">Items</Text>
        <View className="w-12 bg-primary h-1 mx-4"></View>

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
            <Text className="text-center text-gray-400 mt-4">Belum ada data penjualan</Text>
          }
        />
      </View>
    </View>
  );
}