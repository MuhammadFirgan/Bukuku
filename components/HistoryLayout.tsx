import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { HistoryItem } from '@/types';
import ListPenjualan from './ListPenjualan';

type historyProps = {
    width: number
    boxWidth: number
    totalPenjualan: number
    historyPenjualan: HistoryItem[];
}

export default function HistoryLayout({ width, boxWidth, totalPenjualan, historyPenjualan }: historyProps) {
    // const [historyPenjualan, setHistoryPenjualan] = useState<HistoryItem[]>([]);
  return (
    <View className='relative'>
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
    </View>
  )
}