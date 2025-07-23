import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { editHargaBarang, readBarangById } from '@/utils/actions/persediaan.action'
import { router } from 'expo-router'

type Props = {
  id?: string
  namaBarang: string
}

export default function EditPriceForm({ id, namaBarang }: Props) {
  const [hargaBeli, setHargaBeli] = useState('0')
  const [hargaJual, setHargaJual] = useState('0')


  useEffect(() => {
    if (!id) return

    const currentBarang = readBarangById(id)
    if (currentBarang) {
      setHargaBeli(String(currentBarang.harga_beli || 0))
      setHargaJual(String(currentBarang.harga_jual || 0))
    }
  }, [id])

  const handleEditPrice = () => {
    if (!id) return

    const beli = parseInt(hargaBeli, 10)
    const jual = parseInt(hargaJual, 10)

    if (isNaN(beli) || isNaN(jual)) {
      console.warn('Harga tidak valid')
      return
    }

    editHargaBarang(id, beli, jual)
    router.push('/persediaan')
  }


  if (!id) return null

  return (
    <View className='flex flex-row justify-center gap-4 px-4'>
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
      {namaBarang && (
        <View className='flex flex-col justify-end items-center gap-2'>
          <Text>{namaBarang}</Text>
          <Text className='text-red-500'>Gagal</Text>
          <TouchableOpacity 
            className='bg-primary text-center px-4 py-2 rounded-lg' 
            onPress={handleEditPrice}
          >
            <Text className='text-white'>Simpan</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
