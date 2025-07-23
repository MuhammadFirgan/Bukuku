import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModalLayout from './ModalLayout'
import { ModalTrigger } from '@/types'
import EditStockForm from './EditStockForm'
import EditPriceForm from './EditPriceForm'
import { editBarang, readBarangById } from '@/utils/actions/persediaan.action'
import { router } from 'expo-router'


export default function EditFormLayout({ visible, onClose, id }: ModalTrigger) {
  const [mode, setMode] = useState<'stock' | 'harga'>('stock')
  const [hargaBeli, setHargaBeli] = useState('0')
  const [hargaJual, setHargaJual] = useState('0')
  const [barang, setBarang] = useState<any | null>(null)

  const handleEditPrice = () => {
    if (!id) return

    // Validasi input
    const beli = parseInt(hargaBeli, 10)
    const jual = parseInt(hargaJual, 10)

    if (isNaN(beli) || isNaN(jual)) {
      console.warn('Harga tidak valid')
      return
    }

    editBarang(id, beli, jual)
    router.push('/persediaan')
  }

  useEffect(() => {
    if (!id) return
    const currentBarang = readBarangById(id)
    if (currentBarang) {

      setBarang(currentBarang)
      setHargaBeli(String(currentBarang.harga_beli || 0))
      setHargaJual(String(currentBarang.harga_jual || 0))
    } 
  }, [id])
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
            {mode === 'stock' && <EditStockForm id={id}/>}
            {mode === 'harga' && 
              <EditPriceForm
              id={id}
              hargaBeli={hargaBeli}
              hargaJual={hargaJual}
              setHargaBeli={setHargaBeli}
              setHargaJual={setHargaJual}
            />
            }
          </View>

          {barang && (
            <View className='flex flex-col justify-end items-center gap-2'>
              <Text>{barang.nama_barang}</Text>
              <Text className='text-red-500'>Gagal</Text>
              <TouchableOpacity className='bg-primary text-center px-4 py-2 rounded-lg' onPress={handleEditPrice}>
                <Text className='text-white'>Simpan</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ModalLayout>
  )
}
