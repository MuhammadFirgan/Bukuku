import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import ModalLayout from './ModalLayout'
import { ModalTrigger } from '@/types'
import { useEffect, useState } from 'react'
import { createBarang } from '@/utils/actions/persediaan.action'
import { router } from 'expo-router'
import { persediaan$ } from '@/utils/states/PesediaanState'


export default function CreateFormLayout({visible, onClose}: ModalTrigger) {
    const [namaBarang, setNamaBarang] = useState<string>('')
    const [hargaBeli, setHargaBeli] = useState<number>(0)
    const [hargaJual, setHargaJual] = useState<number>(0)

    const handleCreate = async () => {
        await createBarang({
            nama_barang: namaBarang,
            harga_beli: hargaBeli,
            harga_jual: hargaJual,
            quantity: 1
        })


        router.push('/persediaan')
    }

    // useEffect(() => {
    //     const all = persediaan$.get()
    //     Object.entries(all).forEach(([id, value]) => {
    //       const syncMeta = persediaan$.$meta?.sync?.[id]
    //       console.log(
    //         `🧾 ID: ${id}`,
    //         `\n📦 Data: ${JSON.stringify(value, null, 2)}`,
    //         `\n🔁 Status: ${syncMeta?.pending ? '⏳ PENDING' : '✅ SYNCED'}`
    //       )
    //     })
    //   }, [])
      

     
      
      

    
  return (
    <ModalLayout 
        headerTitle='BARANG BARU'
        buttonLabel='Barang Baru'
        visible={visible}
        onClose={onClose}
    >
        <View className='flex flex-row gap-4 px-4 mt-12'>
            <View className="flex flex-col gap-4">
                
                <View className="flex flex-row items-center gap-5">
                    <Text className="text-right">Nama Barang</Text>
                    <TextInput 
                        className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1"
                        value={namaBarang}
                        onChangeText={setNamaBarang}    
                    />
                </View>

    
                <View className="flex flex-row items-center gap-8">
                    <Text className="w-24 text-right">Harga Beli</Text>
                    <TextInput 
                        className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1"
                        value={hargaBeli.toString()}
                        keyboardType='numeric'
                        onChangeText={(text) => setHargaBeli(Number(text))}
                    />
                </View>

                <View className="flex flex-row items-center gap-8">
                    <Text className="w-24 text-right">Harga Jual</Text>
                    <TextInput 
                        className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1" 
                        value={hargaJual.toString()}
                        keyboardType='numeric'
                        onChangeText={(text) => setHargaJual(Number(text))}
                    />
                </View>
            </View>

            
            <View className='flex flex-col justify-end items-center gap-2'>
                <Text>Keuntungan</Text>
                <Text>Rp 1000</Text>
                <TouchableOpacity className='bg-primary text-center px-4 py-2 rounded-lg' onPress={handleCreate}>
                    <Text className='text-white'>Simpan</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ModalLayout>
  )
}