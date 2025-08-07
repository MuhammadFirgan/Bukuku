import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { usePageSetup, formatRupiah } from '@/utils/libs';
import Dropdown from '@/components/Dropdown';
import PengeluaranChart from '@/components/PengeluaranPieChart';
import { readFunds, readItems } from '@/utils/actions/operational.action';
import { readBarang } from '@/utils/actions/persediaan.action';
import { readStock } from '@/utils/actions/stock.action';
import { Barang } from '@/types';

export default function Index() {
  const [periode, setPeriode] = useState('PERIODE 1');
  const [totalAmount, setTotalAmount] = useState('0');
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [totalPengeluaran, setTotalPengeluaran] = useState<number>(0);
  const [operasionalItems, setOperationalItems] = useState<any[]>([]);
  const [stockItems, setStockItems] = useState<any[]>([]); // State baru untuk stok
  const [transaksiTerakhir, setTransaksiTerakhir] = useState<any[]>([]);

  useEffect(() => {
    const fetchFunds = async () => {
      const resultAmount = await readFunds();
      setTotalAmount(resultAmount.toString());

    };
    fetchFunds();
  }, []);

  useEffect(() => {
    const computeKeuangan = async () => {
      try {
        const barang = await readBarang();
        const stock = (await readStock())?.items ?? [];
        setBarangList(barang);
        setStockItems(stock); // Simpan stok ke state

        let pengeluaran = 0;

        barang.forEach((b) => {
          const logBarang = stock.filter((log) => log.barang_id === b.id);
          const masukLogs = logBarang.filter((log) => log.type === 'in');

          const totalMasuk = masukLogs.reduce((sum, log) => sum + (log.amount ?? 0), 0);

          pengeluaran += totalMasuk * b.harga_beli;
        });

        setTotalPengeluaran(pengeluaran);
      } catch (error) {
        console.error('❌ Error in computeKeuangan:', error);
      }
    };

    computeKeuangan();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      const itemList = await readItems();
      setOperationalItems(itemList);

    };
    fetchItems();
  }, []);

  useEffect(() => {
    const combineTransaksi = () => {
      // Normalisasi operasionalItems
      const operasionalTransaksi = operasionalItems.map((item) => ({
        name: item.name,
        price: item.price || 0,
        created_at: item.created_at,
        type: 'Operasional',
      }));

      // Normalisasi barangList dengan stockItems
      const barangTransaksi = barangList.flatMap((b) => {
        const logBarang = stockItems.filter((log) => log.barang_id === b.id && log.type === 'in');
        return logBarang.map((log) => ({
          name: b.nama_barang || 'Barang Tanpa Nama',
          price: (log.amount ?? 0) * (b.harga_beli || 0),
          created_at: log.created_at,
          type: 'Persediaan',
        }));
      });

      // Gabungkan dan urutkan berdasarkan created_at
      const combinedTransaksi = [...operasionalTransaksi, ...barangTransaksi].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setTransaksiTerakhir(combinedTransaksi);
 
    };

    if (barangList.length > 0 || operasionalItems.length > 0) {
      combineTransaksi();
    }
  }, [barangList, operasionalItems, stockItems]); // Ganti stock dengan stockItems

  usePageSetup('Pengeluaran', false);

  return (
    <View className="mx-4">
      <View className="bg-white -mt-8 rounded-lg p-4">
        <View className="flex flex-row justify-center items-center gap-3">
          <Text className="text-lg font-semibold">Pilih Periode</Text>
          <Dropdown
            options={['PERIODE 1', 'PERIODE 2', 'PERIODE 3', 'PERIODE 4']}
            selected={periode}
            onSelect={setPeriode}
            dropdownWidth="w-1/2"
            optionalBgColor="bg-gray-400"
          />
        </View>
        <View className="my-5">
          <Text className="text-xl font-semibold mb-3">Rincian</Text>
          <View className="flex flex-row justify-between">
            <View className="flex flex-col gap-2">
              <Text>Biaya Operasional</Text>
              <Text>Biaya Pembelian Stok</Text>
            </View>
            <View className="flex flex-col gap-2 justify-end">
              <Text>{formatRupiah(parseInt(totalAmount))}</Text>
              <Text>{formatRupiah(totalPengeluaran)}</Text>
            </View>
          </View>
          <PengeluaranChart
            totalAmount={parseInt(totalAmount)}
            totalPengeluaran={totalPengeluaran}
          />
        </View>
      </View>
      <View className="my-4">
        <Text className="text-lg mb-3">Transaksi Terakhir</Text>
        <View className="bg-white p-2 rounded-lg" style={{ maxHeight: 300 }}>
            <FlatList
            data={transaksiTerakhir}
            keyExtractor={(item, index) => `${item.name}-${item.created_at}-${index}`}
            renderItem={({ item }) => (
                <View className="flex flex-row justify-between items-center p-2 border-b border-gray-200">
                <Text className="text-gray-500 font-semibold">{item.name}</Text>
                <View className="flex flex-col items-end">
                    <Text className="text-gray-500">{item.type}</Text>
                    <Text className="text-red-500">{formatRupiah(item.price)}</Text>
                </View>
                </View>
            )}
            ListEmptyComponent={<Text className="text-gray-500 text-center">Belum ada transaksi</Text>}
            contentContainerStyle={{ paddingBottom: 10 }}
            />
        </View>
      </View>
    </View>
  );
}