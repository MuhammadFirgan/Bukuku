import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { usePageSetup } from '@/utils/libs';
import Dropdown from '@/components/Dropdown';

export default function Index() {
    const [periode, setPeriode] = useState('PERIODE 1')
    usePageSetup('Operasional', true)
  return (
    <View className='mx-4'>
        <View className='px-6 py-5 bg-white -mt-10 rounded-lg'>
            <View className='flex flex-row justify-between items-center'>
                <View>
                    <Text>Operasional</Text>
                    <Text>Rp 2.325.000 dari 3.500.000</Text>
                    <View className='w-full h-1 bg-primary mt-2'></View>
                </View>
                <View>
                    <TouchableOpacity className='bg-primary px-4 py-1 rounded-lg'>
                        <Text className='text-white'>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View className='flex flex-row justify-between items-center my-5'>
                            
            <Dropdown
                options={['PERIODE 1', 'PERIODE 2', 'PERIODE 3', 'PERIODE 4']}
                selected={periode}
                onSelect={setPeriode}
                dropdownWidth='w-1/2'
                optionalBgColor='bg-gray-400'
            />
            <TouchableOpacity className='px-4 py-3 bg-primary rounded-lg'>
                <Text className='text-white'>Tambah Barang</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text className='uppercase font-semibold text-gray-600'>History Pembayaran Biaya</Text>
            <View className='flex flex-col gap-4 bg-blue-500 h-full'>
                <View className='flex flex-row justify-between p-4 bg-white rounded-lg'>
                    <Text className='text-gray-400 font-semibold'>Biaya Listrik</Text>
                    <Text className='text-red-500'>500.000</Text>
                </View>
                <View className='flex flex-row justify-between p-4 bg-white rounded-lg'>
                    <Text className='text-gray-400 font-semibold'>Biaya Listrik</Text>
                    <Text className='text-red-500'>500.000</Text>
                </View>
                <View className='flex flex-row justify-between p-4 bg-white rounded-lg'>
                    <Text className='text-gray-400 font-semibold'>Biaya Listrik</Text>
                    <Text className='text-red-500'>500.000</Text>
                </View>
                <View className='flex flex-row justify-between p-4 bg-white rounded-lg'>
                    <Text className='text-gray-400 font-semibold'>Biaya Listrik</Text>
                    <Text className='text-red-500'>500.000</Text>
                </View>
                <View className='flex flex-row justify-between p-4 bg-white rounded-lg'>
                    <Text className='text-gray-400 font-semibold'>Biaya Listrik</Text>
                    <Text className='text-red-500'>500.000</Text>
                </View>
            </View>
        </View>
    </View>
  )
}