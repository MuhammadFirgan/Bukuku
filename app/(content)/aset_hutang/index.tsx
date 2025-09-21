import { items } from '@/constants'
import { usePageSetup } from '@/utils/libs'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'; // Import useState
import CreateAssetsForm from '@/components/CreateAssetsForm';
import CreateDebtForm from '@/components/CreateDebtForm'; // Asumsikan Anda telah membuat file ini

export default function Index() {
    usePageSetup(
        <View className='flex flex-col justify-center items-center'>
            <Text className='text-3xl text-white font-semibold'>Aset Usaha</Text>
            <Text className='text-4xl text-white font-semibold'>Rp 0</Text>
        </View>,
        false,
    );

    const [activeForm, setActiveForm] = useState('asset');

    return (
        <View className="flex-1">
            <View className="flex flex-col gap-3 bg-white p-4 mx-4 mt-5 rounded-xl">
                <Text className="text-xl font-semibold px-3 text-center mb-4">Rincian Aset Usaha</Text>

                <View className="flex flex-row justify-between px-2">
                    <Text className="text-xs font-bold">Keterangan</Text>
                    <Text className="text-xs font-bold">Kategori</Text>
                    <Text className="text-xs font-bold">Nominal</Text>
                </View>

                <View className='h-72'>
                    <FlatList
                        data={items}
                        keyExtractor={(item, index) => `${item.nama}-${index}`}
                        renderItem={({ item }) => (
                            <View className="flex flex-row justify-between px-2 py-1 border-b border-gray-100">
                                <Text className="text-xs text-gray-700 w-1/3">{item.nama}</Text>
                                <Text className="text-xs text-gray-700 w-1/3 text-center">{item.stock}</Text>
                                <Text className="text-xs text-gray-700 w-1/3 text-right">
                                    {item.harga.toLocaleString('id-ID')}
                                </Text>
                            </View>
                        )}
                        ListEmptyComponent={<Text className="text-gray-500 text-center">Belum ada transaksi</Text>}
                    />
                </View>
            </View>

            <View className="flex flex-row justify-center space-x-4 my-4 mx-4 gap-4">
                <TouchableOpacity
                    onPress={() => setActiveForm('asset')}
                    className={`px-6 py-3 rounded-full ${activeForm === 'asset' ? 'bg-[#8AC9AF]' : 'bg-gray-300'}`}
                >
                    <Text className="font-semibold text-white">Aset Usaha</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setActiveForm('debt')}
                    className={`px-6 py-3 rounded-full ${activeForm === 'debt' ? 'bg-[#8AC9AF]' : 'bg-gray-300'}`}
                >
                    <Text className="font-semibold text-white">Hutang Usaha</Text>
                </TouchableOpacity>
            </View>

            
            {activeForm === 'asset' ? (
                <CreateAssetsForm />
            ) : (
                <CreateDebtForm />
            )}
        </View>
    );
}