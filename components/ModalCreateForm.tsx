import AntDesign from '@expo/vector-icons/AntDesign'
import { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, Pressable, TextInput } from 'react-native'


export default function ModalCreateForm() {
    const [ modalVisible, setModalVisible ] = useState(false)
  return (
    <View >
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <Pressable
                className='flex-1 bg-black/40 justify-start items-center'
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Pressable 
                    className='w-full'
                    onPress={(e) => e.stopPropagation()}    
                >
                    <View className='bg-white h-96 rounded-2xl m-3'>
                        <View className='bg-primary h-40 rounded-b-2xl shadow-md'>
                            <TouchableOpacity
                                className="absolute left-4 top-4"
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <AntDesign name="left" size={24} color="white" />
                            </TouchableOpacity>
                            <View className='flex justify-center items-center flex-1'>
                                <Text className='text-center text-3xl text-white font-semibold'>BARANG BARU</Text>
                            </View>
                        </View>
                        <View className='flex flex-row gap-4 px-4 mt-12'>
                            {/* <View className='flex flex-col gap-4 items-center '>
                                <View className='flex flex-row items-center gap-5'>
                                    <Text className="text-right">Nama Barang</Text>
                                    <TextInput 
                                        className='border border-gray-400 w-40 text-xs rounded-xl'
                                    />
                                </View>
                                <View className='flex flex-row items-center gap-5'>
                                    <Text className="text-right">Nama Beli</Text>
                                    <TextInput 
                                        className='border border-gray-400 w-40 text-xs rounded-xl'
                                    />
                                </View>
                                <View className='flex flex-row items-center gap-5'>
                                    <Text className="text-right">Nama Jual</Text>
                                    <TextInput 
                                        className='border border-gray-400 w-40 text-xs rounded-xl'
                                    />
                                </View>
                                
                            </View> */}
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
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
        <TouchableOpacity 
            className='p-3 bg-primary rounded-xl' 
            onPress={() => setModalVisible(!modalVisible)}>
            <Text>Barang Baru</Text>
        </TouchableOpacity>
    </View>
  )
}