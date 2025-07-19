import CountCard from '@/components/CountCard'
import CreateFormLayout from '@/components/CreateFormLayout'
import ListItems from '@/components/ListItems'
import { items } from '@/constants'
import { readBarang } from '@/utils/actions/persediaan.action'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { useState } from 'react'
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native'


export default function Index() {
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const listBarang = readBarang()
    console.log(listBarang)
   
return (
    <View className='w-full '>
        <View className='flex flex-row flex-wrap -mt-14 px-7'>
            <CountCard 
                label='Persediaan'
                value='123'
            />
            <CountCard 
                label='Barang'
                value={listBarang.length.toString()}
            />
            <CountCard 
                label='Barang Masuk'
                value='123'
            />
            <CountCard 
                label='Barang Keluar'
                value='123'
            />
            
        </View>
        <View className='flex flex-row items-center gap-4 pt-8 px-7 mb-5'>
            <View className='relative'>
                <EvilIcons name="search" size={24} color="black" className='absolute top-1/2 -translate-y-1/2 left-3' />
                <TextInput className='border border-gray-400 w-72 rounded-xl placeholder:pl-10' placeholder='Search...'/>
            </View>
            <TouchableOpacity 
                className='p-3 bg-primary rounded-xl mr-4' 
                onPress={() => setModalOpen(!modalOpen)}>
                <Text>Tambah Barang</Text>
            </TouchableOpacity>
           <CreateFormLayout 
                visible={modalOpen}
                onClose={() => setModalOpen(false)}
           />
        </View>

        <FlatList 
            data={listBarang}
            keyExtractor={(item) => item.nama}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (

                <ListItems 
                    name={item.nama_barang}
                    price={item.harga_jual - item.harga_beli}
                    stock={item.quantity}
                    
                />
            )}
        />

        
    </View>
  )
}