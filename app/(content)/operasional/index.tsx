import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { usePageSetup } from '@/utils/libs';
import Dropdown from '@/components/Dropdown';

export default function Index() {
    const [periode, setPeriode] = useState('PERIODE 1')
    const currentAmount = 2325000; // Rp 2.325.000
    const totalAmount = 3500000; // Rp 3.500.000
    const percentage = (currentAmount / totalAmount) * 100;

    usePageSetup('Operasional', true, 
        <View className='bg-white mx-4 p-4 -mt-8 rounded-lg flex flex-row justify-between items-center'>
            <View>
                <Text className='text-lg font-semibold'>Total Beban</Text>
                <Text className='text-sm text-gray-400'>Biaya untuk operasional toko</Text>
            </View>
            <Text className='text-xl text-red-500 font-semibold'>Rp 2.520.220</Text>
        </View>
    )

    return (
        <View className='mx-4 flex-1'>
            <View className='px-6 py-5 bg-white -mt-10 rounded-lg'>
                <View className='flex flex-row justify-between items-center'>
                    <View>
                        <Text>Operasional</Text>
                        <Text>Rp {currentAmount} dari {totalAmount}</Text>
                        <View className='w-3/4 h-1 bg-gray-200 mt-2 rounded-full overflow-hidden flex-row'>
                            <View
                                className={`h-1 bg-red-500`}
                                style={{ width: `${percentage}%` }}
                                
                            />
                            <View
                                className={`h-1 bg-primary`}
                                style={{ width: `${100 - percentage}%` }}
                            />
                        </View>
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

            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                <View>
                    <Text className='uppercase font-semibold text-gray-600'>History Pembayaran Biaya</Text>
                    <View className='flex flex-col gap-4 '>
                        {[...Array(10)].map((_, index) => (
                            <View key={index} className='flex flex-row justify-between p-4 bg-white rounded-lg'>
                                <Text className='text-gray-400 font-semibold'>Biaya Listrik</Text>
                                <Text className='text-red-500'>500.000</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}