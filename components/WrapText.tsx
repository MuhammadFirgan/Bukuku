import { View, Text } from 'react-native'
import React from 'react'
import { formatRupiah } from '@/utils/libs'

export default function WrapText({ label, value, isBold = false }: { label: string, value: number, isBold?: boolean }) {
  return (
    <View className='flex justify-between flex-row'>
        <Text className={`${isBold ? 'font-semibold' : 'font-normal'}`}>{label}</Text>
        <Text className={`${isBold ? 'font-semibold' : 'font-normal'}`}>{formatRupiah(value)}</Text>
    </View>
  )
}