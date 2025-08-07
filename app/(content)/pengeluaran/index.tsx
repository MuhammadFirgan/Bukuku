import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePageSetup } from '@/utils/libs'
import Dropdown from '@/components/Dropdown'
import PengeluaranChart from '@/components/PengeluaranPieChart'
import { readFunds } from '@/utils/actions/operational.action'
import { formatRupiah } from './../../../utils/libs/index';

export default function Index() {
    const [periode, setPeriode] = useState('PERIODE 1')
    const [totalAmount, setTotalAmount] = useState('0');


    useEffect(() => {
        const fetchFunds = async () => {
          const resultAmount = await readFunds();
          setTotalAmount(resultAmount.toString());
          console.log('Total amount:', resultAmount); // Debug
        };
        fetchFunds();
      }, []);
    usePageSetup('Pengeluaran', false)
  return (
    <View className='mx-4'>
        <View className='bg-white  -mt-8 rounded-lg p-4'>
            <View className='flex flex-row justify-center items-center gap-3'>
                <Text className='text-lg font-semibold'>Pilih Periode</Text>
                <Dropdown 
                    options={['PERIODE 1', 'PERIODE 2', 'PERIODE 3', 'PERIODE 4']}
                    selected={periode}
                    onSelect={setPeriode}
                    dropdownWidth='w-1/2'
                    optionalBgColor='bg-gray-400'
                />
            </View>
            <View className='my-5'>
                <Text className='text-xl font-semibold mb-3 '>Rincian</Text>
                <View className='flex flex-row justify-between'>
                    <View className='flex flex-col gap-2'>
                        <Text>Biaya Operasional</Text>
                        <Text>Biaya Pembelian Stok</Text>
                    </View>
                    <View className='flex flex-col gap-2 justify-end'>
                        <Text>{formatRupiah(parseInt(totalAmount))}</Text>
                        <Text>Rp 222.222.222</Text>

                    </View>
                </View>
                <PengeluaranChart />
            </View>

        </View>
        <View className='my-4'>
            <Text className='text-lg mb-3'>Transaksi Terakhir</Text>
            <View className='bg-white p-2 rounded-full'>
                <View className='flex flex-row justify-between items-center'>
                    <Text className='text-gray-500 font-semibold'>Biaya Listrik</Text>
                    <Text className='text-gray-500'>Operasional</Text>
                </View>
            </View>
        </View>
    </View>
  )
}