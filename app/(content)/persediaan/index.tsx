import CountCard from '@/components/CountCard'
import ListItems from '@/components/ListItems'
import ModalCreateForm from '@/components/ModalCreateForm'
import { items } from '@/constants'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'


export default function index() {
return (
    <View className='w-full '>
        <View className='flex flex-row flex-wrap -mt-14 px-7'>
            <CountCard 
                label='Persediaan'
                value='123'
            />
            <CountCard 
                label='Barang'
                value='123'
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
            <ModalCreateForm />
        </View>

        <FlatList 
            data={items}
            keyExtractor={(item) => item.nama}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (

                <ListItems 
                    name={item.nama}
                    price={item.harga}
                    stock={item.stock}
                    
                />
            )}
        />

        
    </View>
  )
}