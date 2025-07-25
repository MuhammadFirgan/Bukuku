import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePageSetup } from '@/utils/libs'
import AntDesign from '@expo/vector-icons/AntDesign'
import Dropdown from '@/components/Dropdown'
import { Barang, StockLog } from '@/types'
import { readBarang } from '@/utils/actions/persediaan.action'
import { readStock } from '@/utils/actions/stock.action'
import {  groupByWeekFromDate, mergeStockLogsByDay } from '@/utils/libs/groupPurchases'

// const startDate = new Date('2025-07-1') // Mulai dari 25 Juli 2025


export default function Index() {
  // const [selected, setSelected] = useState("PERIODE 1")
  const [periode, setPeriode] = useState('PERIODE 1')
  const [weeks, setWeeks] = useState<ReturnType<typeof groupByWeekFromDate>>([])
  const [barang, setBarang] = useState<Barang[]>([])
  const [stock, setStock] = useState<StockLog[]>([])
  const [weeksData, setWeeksData] = useState([])


  const monthIndex = parseInt(periode.split(' ')[1]) - 1 // 0-indexed

  useEffect(() => {
    const fetchData = async () => {
      const barangData = await readBarang()
      const stockData = await readStock()?.items ?? []
      setBarang(barangData)
      setStock(stockData)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const mergedLogs = mergeStockLogsByDay(stock, barang)
    const startDate = new Date('2025-07-25')
    const result = groupByWeekFromDate(mergedLogs, barang, startDate)
  
    setWeeks(result)
  }, [stock, barang])
  

  // Footer Ringkasan
  usePageSetup(
    'Pembelian',
    true,
    <View className="flex flex-row justify-between items-center px-5 pt-4">
      <View>
        <Text className="text-xl font-semibold">Ringkasan</Text>
        <Text className="text-gray-700">Total Pengeluaran</Text>
      </View>
      <Text className="text-xl text-red-500 font-semibold">Rp. 345.678.900</Text>
    </View>
  )

  return (
    <View className='flex-1'>
      <View className="px-5 pt-10 pb-6 bg-white shadow-xl -mt-12 mx-4 rounded-lg">
        <Text className="text-white text-base mb-2 text-primary">Periode Pembelian :</Text>

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

      <ScrollView className='mt-4 pb-36 h-full mb-40'>
        {weeks.map((week, idx) => (
          <View key={idx} className='flex flex-col gap-3 bg-white p-4'>
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

    // <ScrollView className="flex-1 bg-gray-50 px-4 pt-10 mb-40 pb-96">
    //   <Dropdown
    //     options={['PERIODE 1', 'PERIODE 2', 'PERIODE 3', 'PERIODE 4']}
    //     selected={periode}
    //     onSelect={setPeriode}
    //   />

    //   {weeks.map((week, idx) => (
    //     <View key={idx} className="bg-white mt-6 p-4 rounded-lg shadow-sm">
    //       <Text className="font-semibold text-primary mb-3">Minggu Ke-{idx + 1}</Text>

    //       <View className="flex flex-row justify-between px-2">
    //         <Text className="text-xs w-1/3 font-bold">Jenis</Text>
    //         <Text className="text-xs w-1/3 font-bold">Unit</Text>
    //         <Text className="text-xs w-1/3 font-bold">Biaya</Text>
    //       </View>

    //       {week.map((day, dayIdx) => (
    //         <View key={dayIdx} className="flex flex-row justify-between px-2 py-1 border-b border-gray-100">
    //           <Text className="text-xs w-1/3 text-gray-700">{day.jenis}</Text>
    //           <Text className="text-xs w-1/3 text-gray-700">{day.unit}</Text>
    //           <Text className="text-xs w-1/3 text-gray-700">
    //             {day.biaya === '-' ? '-' : `Rp ${Number(day.biaya).toLocaleString('id-ID')}`}
    //           </Text>
    //         </View>
    //       ))}
    //     </View>
    //   ))}
    // </ScrollView>
  )
}
