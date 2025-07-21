import { View, Text } from 'react-native'
import { usePageSetup } from '@/utils/libs'


export default function Index() {
    usePageSetup('Penjualan', <Text>Penjualan</Text>)
  return (
    <View>
        <View className='bg-white mx-4 -mt-8 rounded-lg px-5 py-4'>
            <Text className='font-semibold text-xl'>INFORMASI</Text>
            <View className='bg-primary w-32 h-1 mt-2'></View>
                <View className='flex flex-row items-center mt-7 justify-between'>
                    <View className='flex flex-row items-center justify-between w-3/4'>
                        <Text className='text-xs'>Penjualan Bulanan</Text>
                        <Text className='text-xs text-gray-500 '>Total Pendapatan Kotor</Text>
                        
                    </View>
                    <Text className='text-xs text-primary'>Rp 1.200.0000</Text>
                </View>
                <View className='flex flex-row items-center mt-7 justify-between'>
                    <View className='flex flex-row items-center justify-between  gap-8 w-3/4'>
                        <Text className='text-xs'>Modal yang Dikeluarkan</Text>
                        <Text className='text-xs text-gray-500'>Total Modal</Text>
                    </View>
                    <Text className='text-xs text-red-500'>Rp 75.000</Text>
                </View>
                <View className='flex flex-row items-center mt-7 justify-between '>
                    <View className='flex flex-row items-center justify-between  gap-8 w-3/4'>
                        <Text className='text-xs'>Keuntungan</Text>
                        <Text className='text-xs text-gray-500'>Total Keuntungan</Text>

                    </View>
                    <Text className='text-xs text-primary'>Rp 1.200.0000</Text>
                </View>
                <View className='flex flex-row justify-end'>

                    <View className='bg-primary w-20 h-1 mt-2'></View>
                </View>
            
        </View>
    </View>
  )
}