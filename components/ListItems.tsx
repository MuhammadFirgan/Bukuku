import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { ListItemsProps } from '@/types';
import { useState } from 'react';

export default function ListItems({ name, price, stock }: ListItemsProps) {
  const [stockExist, setStockExist] = useState<number>(0)

  const maxStock = Math.min(stock, 5) 
  const handleIncrement = () => {
    if (stockExist < maxStock) {
      setStockExist(stockExist + 1)
    }
  }

  const handleDecrement = () => {
    if (stockExist > 0) {
      setStockExist(stockExist - 1)
    }
  }

  return (
    <View className='flex flex-row justify-between bg-white items-center px-2 py-4 my-2'>
      <View>
        <Text className='text-lg'>{name}</Text>
        <Text className='text-sm text-gray-600'>Stock Tersedia : {stock + stockExist}</Text>
      </View>

      <View className='flex flex-col items-center'>
        <View className="flex flex-row items-end gap-2 space-x-2">
          <Text className="text-xs">Stock :</Text>
          <View className="flex flex-col items-center">
            <Text className="text-xs">Max : {maxStock}</Text>
            <Text className="border w-16 text-black text-xs text-center py-0 opacity-50">{stockExist}</Text>
          </View>
        </View>

        <View className='flex flex-row gap-3 mt-2'>
          <TouchableOpacity
            className={`p-1 rounded ${stockExist === 0 ? 'bg-gray-300' : 'bg-red-500'}`}
            onPress={handleDecrement}
            disabled={stockExist === 0}
          >
            <AntDesign name="minus" size={12} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-1 rounded ${stockExist === maxStock ? 'bg-gray-300' : 'bg-primary'}`}
            onPress={handleIncrement}
            disabled={stockExist === maxStock}
          >
            <AntDesign name="plus" size={12} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text className='text-sm text-gray-700'>Keuntungan Satuan</Text>
        <Text className='text-xl text-center'>{price}</Text>
      </View>
    </View>
  )
}
