import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TransactionPieChart from '@/components/TransactionPieChart'
import BebanUsahaChart from '@/components/BebanUsahaChart'

export default function index() {
  return (
    <ScrollView>
      <View className='m-5'>

        <View className='bg-white rounded-xl'>
          <TransactionPieChart 
            totalPendapatan={200}
            totalPengeluaran={200}
          />
        </View>
        <View className='flex flex-row justify-center gap-5 mt-4'>
          <View className='bg-white p-3 rounded-xl flex items-center'>
            <Text className='text-lg font-semibold'>Total Pendapatan</Text>
            <Text className='text-green-500 font-semibold'>Rp 5.500.000</Text>
          </View>
          <View className='bg-white p-3 rounded-xl flex items-center'>
            <Text className='text-lg font-semibold'>Total Pengeluaran</Text>
            <Text className='text-red-500 font-semibold'>Rp 5.500.000</Text>
          </View>
        </View>
        <Text className='m-4 font-semibold text-lg uppercase'>Beban Usaha</Text>
        <View className='bg-white rounded-xl'>
          <BebanUsahaChart 
            totalPendapatan={200}
            totalPengeluaran={200}
          />
        </View>
        <Text className='m-4 font-semibold text-lg uppercase'>Hutang Usaha</Text>
        <View className='bg-white p-3 rounded-xl flex items-center flex-row justify-between py-5 px-3'>
          <Text className='text-lg font-semibold text-gray-300'>Total Hutang Usaha</Text>
          <Text className='text-red-500 font-semibold'>Rp 5.500.000</Text>
        </View>
        <Text className='m-4 font-semibold text-lg uppercase'>Aset</Text>
        <View className='bg-white p-3 rounded-xl flex items-center flex-row justify-between py-5 px-3'>
          <Text className='text-lg font-semibold text-gray-300'>Nilai Aset Bertambah</Text>
          <Text className='text-green-500 font-semibold'>Rp 5.500.000</Text>
        </View>
      </View>
      
    </ScrollView>
  )
}