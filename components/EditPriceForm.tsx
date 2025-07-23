import { View, Text, TextInput } from 'react-native'
import React from 'react'

type Props = {
  id?: string
  hargaBeli: string
  hargaJual: string
  setHargaBeli: (val: string) => void
  setHargaJual: (val: string) => void
}

export default function EditPriceForm({
  id,
  hargaBeli,
  hargaJual,
  setHargaBeli,
  setHargaJual
}: Props) {
  if (!id) return null

  return (
    <View className='flex flex-col gap-2 items-center'>
      <View className="flex flex-row items-center">
        <Text className="w-24 text-left">Harga Beli</Text>
        <TextInput
          className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1"
          keyboardType='numeric'
          value={hargaBeli}
          onChangeText={setHargaBeli}
        />
      </View>

      <View className="flex flex-row items-center">
        <Text className="w-24 text-left">Harga Jual</Text>
        <TextInput
          className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1"
          keyboardType='numeric'
          value={hargaJual}
          onChangeText={setHargaJual}
        />
      </View>
    </View>
  )
}
