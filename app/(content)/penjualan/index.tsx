import { View, Text, TextInput, Dimensions } from 'react-native'
import { usePageSetup } from '@/utils/libs'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import ListPenjualan from '@/components/ListPenjualan';


export default function Index() {
    usePageSetup('Penjualan', true)
    const { width } = Dimensions.get('window');
    const boxWidth = width * 0.9;
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
        <View className='flex justify-center items-center my-5'>
            <View className='relative'>
                <EvilIcons name="search" size={24} color="#9ca3af" className='absolute top-1/2 -translate-y-1/2 left-3 z-50' />
                <TextInput className='border border-gray-400 w-72 rounded-xl placeholder:pl-10 bg-white' placeholder='Search...'/>
            </View>
        </View>
        <View className='relative'>
            <View className='absolute top-1/2 h-[400px] z-50 py-5 bg-white rounded-lg' style={{
                width: boxWidth,
                left: width / 2,
                transform: [{ translateX: -boxWidth / 2 }],    
                }}>
                <View className='border-b pb-4 border-gray-300'>
                    <View className='px-5 flex justify-between items-center flex-row'>
                        <Text className="font-semibold">Penjualan</Text>
                        <Text className='text-primary'>Rp 1.000.000</Text>
                    </View>
                </View>
                <Text className='px-5 font-semibold pt-3'>Items</Text>
                <View className='w-12 bg-primary h-1 mx-4'></View>

                <ListPenjualan />
                <ListPenjualan />
                <ListPenjualan />
                <ListPenjualan />

            </View>
        </View>
    </View>
  )
}