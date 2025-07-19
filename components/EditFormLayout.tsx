import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ModalLayout from './ModalLayout'
import { ModalTrigger } from '@/types'
import EditStockForm from './EditStockForm'
import EditPriceForm from './EditPriceForm'


export default function EditFormLayout({ visible, onClose }: ModalTrigger) {
  const [mode, setMode] = useState<'stock' | 'harga'>('stock')

  return (
    <ModalLayout
      headerTitle='Tambah Stock'
      visible={visible}
      onClose={onClose}
    >
      <View>
        {/* Toggle Buttons */}
        <View className='flex flex-row justify-center gap-4 -mt-5'>
          <Pressable 
            className={`bg-white p-3 rounded-lg shadow-2xl ${mode === 'stock' ? 'border-2 border-primary' : ''}`}
            onPress={() => setMode('stock')}
          >
            <Text className='text-primary'>Tambah Stock</Text>
          </Pressable>
          <Pressable 
            className={`bg-white p-3 rounded-lg shadow-2xl ${mode === 'harga' ? 'border-2 border-primary' : ''}`}
            onPress={() => setMode('harga')}
          >
            <Text className='text-primary'>Edit Harga</Text>
          </Pressable>
        </View>

        {/* Form Content */}
        <View className='flex flex-row justify-center gap-4 px-4 mt-8'>
          <View className="flex flex-col gap-4">
            {mode === 'stock' && <EditStockForm />}
            {mode === 'harga' && <EditPriceForm />}
          </View>

          <View className='flex flex-col justify-end items-center gap-2'>
            <Text>Indomie Aceh</Text>
            <Text className='text-red-500'>Gagal</Text>
            <TouchableOpacity className='bg-primary text-center px-4 py-2 rounded-lg'>
              <Text className='text-white'>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ModalLayout>
  )
}
