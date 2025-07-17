import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ListItems() {
  return (
    <View className='flex flex-row justify-between bg-white items-center px-2 py-4 '>
      <View>
        <Text className='text-lg'>Indomie Rendang</Text>
        <Text className='text-sm text-gray-600'>Stock Tersedia : 15</Text>
      </View>
      <View className='flex flex-col items-center '>

        <View className="flex flex-row items-end gap-2 space-x-2">
            <Text className="text-xs">Stock :</Text>
            <View className="flex flex-col items-center">
                <Text className="text-xs ">Max : 5</Text>
                <Text className="border w-16 text-black text-xs text-center py-0">5</Text>
            </View>
        </View>

        <View className='flex flex-row gap-3 mt-2'>
            <TouchableOpacity className='p-1 bg-red-500'>
                <AntDesign name="minus" size={12} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className='p-1 bg-primary'>
                <AntDesign name="plus" size={12} color="white" />
            </TouchableOpacity>
            
        </View>

      </View>
      <View>
        <Text className='text-sm text-gray-700'>Keuntungan Satuan</Text>
        <Text className='text-xl text-center'>1.100</Text>
      </View>
    </View>
  )
}