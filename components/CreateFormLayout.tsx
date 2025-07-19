import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import ModalLayout from './ModalLayout'

export default function CreateFormLayout() {
  return (
    <ModalLayout 
        headerTitle='BARANG BARU'
        buttonLabel='Barang Baru'
    >
        <View className='flex flex-row gap-4 px-4 mt-12'>
            <View className="flex flex-col gap-4">
                
                <View className="flex flex-row items-center gap-5">
                    <Text className="text-right">Nama Barang</Text>
                    <TextInput className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1" />
                </View>

    
                <View className="flex flex-row items-center gap-8">
                    <Text className="w-24 text-right">Harga Beli</Text>
                    <TextInput className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1" />
                </View>

                <View className="flex flex-row items-center gap-8">
                    <Text className="w-24 text-right">Harga Jual</Text>
                    <TextInput className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1" />
                </View>
            </View>

            
            <View className='flex flex-col justify-end items-center gap-2'>
                <Text>Keuntungan</Text>
                <Text>Rp 1000</Text>
                <TouchableOpacity className='bg-primary text-center px-4 py-2 rounded-lg'>
                    <Text className='text-white'>Simpan</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ModalLayout>
  )
}