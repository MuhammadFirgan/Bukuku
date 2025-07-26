import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { usePageSetup } from '@/utils/libs';
import AntDesign from '@expo/vector-icons/AntDesign';
import Dropdown from '@/components/Dropdown';
import { Barang, StockLog } from '@/types';
import { readBarang } from '@/utils/actions/persediaan.action';
import { readStock } from '@/utils/actions/stock.action';
import { groupByWeekFromDate, mergeStockLogsByDay } from '@/utils/libs/groupPurchases';

// Tanggal mulai untuk periode pertama (Juli 2025)
const BASE_START_DATE = new Date('2025-07-25');

export default function Index() {
  const [periode, setPeriode] = useState('PERIODE 1');
  const [weeks, setWeeks] = useState<ReturnType<typeof groupByWeekFromDate>>([]);
  const [barang, setBarang] = useState<Barang[]>([]);
  const [stock, setStock] = useState<StockLog[]>([]);
  const [totalPengeluaran, setTotalPengeluaran] = useState<number>(0);

  const monthIndex = parseInt(periode.split(' ')[1]) - 1; // 0-indexed (PERIODE 1 = 0, PERIODE 2 = 1, dst.)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const barangData = await readBarang();
        const stockData = await readStock()?.items ?? [];
        setBarang(barangData);
        setStock(stockData);
      } catch (error) {
        console.error('❌ Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Sesuaikan startDate berdasarkan periode yang dipilih
    const startDate = new Date(BASE_START_DATE);
    startDate.setMonth(BASE_START_DATE.getMonth() + monthIndex);

    const mergedLogs = mergeStockLogsByDay(stock, barang);
    const result = groupByWeekFromDate(mergedLogs, barang, startDate);
    setWeeks(result);

    // Hitung total pengeluaran untuk periode yang dipilih
    const calculateTotalPengeluaran = () => {
      let total = 0;

      // Jumlahkan biaya dari semua entri dalam weeks
      result.forEach((week) => {
        week.forEach((day) => {
          if (day.biaya !== '-') {
            total += Number(day.biaya);
          }
        });
      });

      setTotalPengeluaran(total);
      console.log(`Total pengeluaran untuk ${periode}: Rp ${total.toLocaleString('id-ID')}`);
    };

    calculateTotalPengeluaran();
  }, [stock, barang, periode]);

  // Footer Ringkasan
  usePageSetup(
    'Pembelian',
    true,
    <View className="flex flex-row justify-between items-center px-5 pt-4">
      <View>
        <Text className="text-xl font-semibold">Ringkasan</Text>
        <Text className="text-gray-700">Total Pengeluaran</Text>
      </View>
      <Text className="text-xl text-red-500 font-semibold">
        Rp {totalPengeluaran.toLocaleString('id-ID')}
      </Text>
    </View>
  );

  return (
    <View className="flex-1">
      <View className="px-5 pt-10 pb-6 bg-white shadow-xl -mt-12 mx-4 rounded-lg">
        <Text className="text-base mb-2 text-primary">Periode Pembelian :</Text>

        <View className="flex-row items-center gap-4">
          <View className="bg-white p-4 rounded-lg">
            <AntDesign name="calendar" size={24} color="#22c55e" />
          </View>

          <View className="flex-1">
            <Dropdown
              options={['PERIODE 1', 'PERIODE 2', 'PERIODE 3', 'PERIODE 4']}
              selected={periode}
              onSelect={setPeriode}
            />
          </View>
        </View>
      </View>

      <ScrollView className="mt-4 pb-36 h-full mb-40">
        {weeks.map((week, idx) => (
          <View key={idx} className="flex flex-col gap-3 bg-white p-4">
            <Text className="text-xl font-semibold px-3">Minggu Ke-{idx + 1}</Text>

            <View className="flex flex-row justify-between px-2">
              <Text className="text-xs w-1/3 font-bold">Jenis Pembelian</Text>
              <Text className="text-xs w-1/3 font-bold">Unit Pembelian</Text>
              <Text className="text-xs w-1/3 font-bold">Biaya Pembelian</Text>
            </View>

            {week.map((day, dayIdx) => (
              <View key={dayIdx} className="flex flex-row justify-between px-2 py-1 border-b border-gray-100">
                <Text className="text-xs w-1/3 text-gray-700">{day.jenis}</Text>
                <Text className="text-xs w-1/3 text-gray-700">{day.unit}</Text>
                <Text className="text-xs w-1/3 text-gray-700">
                  {day.biaya === '-' ? '-' : `Rp ${Number(day.biaya).toLocaleString('id-ID')}`}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}