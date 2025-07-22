import { View, Text } from 'react-native'

export default function ListPenjualan() {
  return (
    <View className='p-5 flex flex-row justify-between items-center border-b border-gray-300'>
      <View className='flex w-[30%]'>
        <Text className='font-semibold' numberOfLines={1} ellipsizeMode="tail">Indomie Aceh</Text>
        <Text className='text-gray-400'>Terjual : 26</Text>
      </View>
      <View className='flex items-center'>
        <Text className='text-gray-500'>Harga Satuan</Text>
        <Text className='text-red-500'>2.900</Text>
      </View>
      <View className='flex items-center'>
        <Text className='text-gray-500'>Keuntungan</Text>
        <Text className='text-primary'>Rp 123.456.789</Text>
      </View>
    </View>
  )
}