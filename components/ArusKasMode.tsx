import { View, Text } from 'react-native'
import React from 'react'
import WrapText from './WrapText'

export default function ArusKasMode() {
  return (
    <View>
        <Text className='font-semibold text-lg mt-4 uppercase'>Kas Masuk</Text>
        <WrapText 
            label='Penerimaan'
            value={200}
        />
        <WrapText 
            label='Total Kas Masuk'
            value={200}
            isBold
        />
        <Text className='font-semibold text-lg mt-4 uppercase'>Kas Keluar</Text>
    
        <WrapText 
            label='Gaji'
            value={200}
        />
        <WrapText 
            label='Listrik'
            value={200}
        />
        <Text className='font-semibold text-lg mt-4 uppercase'>Kenaikan / Penurunan Kas</Text>
        <WrapText 
            label='Saldo Kas Awal Bulan'
            value={200}
        />
        <WrapText 
            label='Saldo Kas Akhir Bulan'
            value={200}
        />
    </View>
  )
}