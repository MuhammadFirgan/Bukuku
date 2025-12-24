import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import ModalLayout from './ModalLayout'
import { ModalTrigger } from '@/types'
import WrapText from './WrapText'

export default function LaporanModal({visible, onClose}: ModalTrigger) {
    const [mode, setMode] = useState<'Laba Rugi' | 'Arus Kas' | 'Hutang & Aset'>('Laba Rugi')
  return (
    <ModalLayout
        headerTitle='Total Laporan Keuangan'
        visible={visible}
        onClose={onClose}
    >
        <View className='flex flex-row justify-center gap-3 -mt-5'>
            <Pressable 
                className={`bg-white p-3 rounded-lg shadow-2xl ${mode === 'Laba Rugi' ? 'border-2 border-primary' : ''}`}
                onPress={() => setMode('Laba Rugi')}
            >
                <Text className='text-primary'>Laba Rugi</Text>
            </Pressable>
            <Pressable 
                className={`bg-white p-3 rounded-lg shadow-2xl ${mode === 'Arus Kas' ? 'border-2 border-primary' : ''}`}
                onPress={() => setMode('Arus Kas')}
            >
                <Text className='text-primary'>Arus Kas</Text>
            </Pressable>
            <Pressable 
                className={`bg-white p-3 rounded-lg shadow-2xl ${mode === 'Hutang & Aset' ? 'border-2 border-primary' : ''}`}
                onPress={() => setMode('Hutang & Aset')}
            >
                <Text className='text-primary'>Hutang & Aset</Text>
            </Pressable>
        </View>
        <View className='p-5'>
            <View className='flex justify-between flex-row border-b pb-3 border-gray-300'>
                <Text>Keterangan</Text>
                <Text>Jumlah (Rp)</Text>
            </View>
            {mode === 'Laba Rugi' && (
                
                <View>
                    <Text className='font-semibold text-lg mt-4 uppercase'>Pendapatan</Text>
                    <WrapText 
                        label='Total Pendapatan Kotor'
                        value={200}
                    />
                    <WrapText 
                        label='Total Modal'
                        value={200}
                    />
                    <WrapText 
                        label='Total Keuntungan'
                        value={200}
                    />
                    <Text className='font-semibold text-lg mt-4 uppercase'>Beban Operasional</Text>
                    <WrapText 
                        label='Gaji'
                        value={200}
                    />
                    <WrapText 
                        label='Listrik'
                        value={200}
                    />
                </View>
            )}
            {mode === 'Arus Kas' && (
                <View>
                    <Text className='font-semibold text-lg mt-4 uppercase'>Kas Masuk</Text>
                    <WrapText 
                        label='Penerimaan'
                        value={200}
                    />
                    <WrapText 
                        label='Total Kas Masuk'
                        value={200}
                        isBold
                    />
                    <Text className='font-semibold text-lg mt-4 uppercase'>Kas Keluar</Text>
                    <WrapText 
                        label='Total Keuntungan'
                        value={200}
                    />
                    <WrapText 
                        label='Gaji'
                        value={200}
                    />
                    <WrapText 
                        label='Listrik'
                        value={200}
                    />
                    <Text className='font-semibold text-lg mt-4 uppercase'>Kas Keluar</Text>
                    <WrapText 
                        label='Gaji'
                        value={200}
                    />
                    <WrapText 
                        label='Listrik'
                        value={200}
                    />
                </View>
            )}
            {mode === 'Hutang & Aset' && (
                <View>
                    <Text className='font-semibold text-lg mt-4 uppercase'>Pendapatan</Text>
                    <WrapText 
                        label='Total Pendapatan Kotor'
                        value={200}
                    />
                    <WrapText 
                        label='Total Modal'
                        value={200}
                    />
                    <WrapText 
                        label='Total Keuntungan'
                        value={200}
                    />
                    <Text className='font-semibold text-lg mt-4 uppercase'>Beban Operasional</Text>
                    <WrapText 
                        label='Gaji'
                        value={200}
                    />
                    <WrapText 
                        label='Listrik'
                        value={200}
                    />
                </View>
            )}
        </View>
    </ModalLayout>
  )
}