import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { usePageSetup } from '@/utils/libs'
import AntDesign from '@expo/vector-icons/AntDesign'
import Dropdown from '@/components/Dropdown'

export default function Index() {
  const [selected, setSelected] = useState("PERIODE 1")

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
              options={['PERIODE 1', 'PERIODE 2', 'PERIODE 3']}
              selected={selected}
              onSelect={setSelected}
            />
          </View>
        </View>
      </View>

 
      <ScrollView className='my-4'>
        <View>
          <View className=' bg-white mx-4 mt-4 p-4 flex flex-row justify-center gap-3 rounded-lg'>
            <View className='flex flex-col items-center gap-3'>
              <Text className="text-xs">Minggu Ke-1</Text>
              <View className='flex flex-col gap-3'>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
              </View>
            </View>
            <View className='flex flex-col items-center gap-3'>
              <Text className="text-xs">Jenis Pembelian</Text>
              <View className='flex flex-col gap-3'>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
              </View>
            </View>
            <View className='flex flex-col items-center gap-3'>
              <Text className="text-xs">Unit Pembelian</Text>
              <View className='flex flex-col gap-3'>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
              </View>
            </View>
            <View className='flex flex-col items-center gap-3'>
              <Text className="text-xs">Biaya Pembelian</Text>
              <View className='flex flex-col gap-3'>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View className='bg-white mx-4 mt-4 p-4 flex flex-row justify-center gap-3 rounded-lg'>
            <View className='flex flex-col items-center gap-3'>
              <Text className="text-xs">Minggu Ke-1</Text>
              <View className='flex flex-col gap-3'>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
              </View>
            </View>
            <View className='flex flex-col items-center gap-3'>
              <Text className="text-xs">Jenis Pembelian</Text>
              <View className='flex flex-col gap-3'>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
              </View>
            </View>
            <View className='flex flex-col items-center gap-3'>
              <Text className="text-xs">Unit Pembelian</Text>
              <View className='flex flex-col gap-3'>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
              </View>
            </View>
            <View className='flex flex-col items-center gap-3'>
              <Text className="text-xs">Biaya Pembelian</Text>
              <View className='flex flex-col gap-3'>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View className='bg-white mx-4 mt-4 p-4 flex flex-row justify-center gap-3 rounded-lg'>
            <View className='flex flex-col items-center gap-3'>
              <Text className="text-xs">Minggu Ke-1</Text>
              <View className='flex flex-col gap-3'>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
              </View>
            </View>
            <View className='flex flex-col items-center gap-3'>
              <Text className="text-xs">Jenis Pembelian</Text>
              <View className='flex flex-col gap-3'>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
              </View>
            </View>
            <View className='flex flex-col items-center gap-3'>
              <Text className="text-xs">Unit Pembelian</Text>
              <View className='flex flex-col gap-3'>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
              </View>
            </View>
            <View className='flex flex-col items-center gap-3'>
              <Text className="text-xs">Biaya Pembelian</Text>
              <View className='flex flex-col gap-3'>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
                <Text className="text-xs">Hari ke 1</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
