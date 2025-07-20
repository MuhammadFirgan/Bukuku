import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { ListItemsProps } from '@/types';
import { useEffect, useState } from 'react';
import EditFormLayout from './EditFormLayout';
import { updateStock } from '@/utils/actions/persediaan.action';

export default function ListItems({ name, price, stock, id }: ListItemsProps) {
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [localStock, setLocalStock] = useState<number>(stock)
  const [dirty, setDirty] = useState<boolean>(false)


  const maxStock = 5
  const handleIncrement = () => {
    if (localStock < stock + maxStock) {
      setLocalStock(prev => prev + 1)
      setDirty(true)
    }
  }

  const handleDecrement = () => {
    if (localStock > stock) {
      setLocalStock(prev => prev - 1)
      setDirty(true)
    }
  }

  useEffect(() => {
    if (!dirty) return

    const timeout = setTimeout(() => {
      updateStock(localStock, id)
      setDirty(false)
      
    }, 500) 

    return () => clearTimeout(timeout) 
  }, [localStock, dirty, id])


  return (
    <>
    
      <TouchableOpacity 
        onPress={() => setIsModalOpen(!isModalOpen)}
        className='flex flex-row justify-between bg-white items-center px-2 py-4 my-2'>
        <View>
          <Text className='text-lg'>{name}</Text>
          <Text className='text-sm text-gray-600'>Stock Tersedia : {stock + localStock}</Text>
        </View>

        <View className='flex flex-col items-center'>
          <View className="flex flex-row items-end gap-2 space-x-2">
            <Text className="text-xs">Stock :</Text>
            <View className="flex flex-col items-center">
              <Text className="text-xs">Max : 5</Text>
              <Text className="border w-16 text-black text-xs text-center py-0 opacity-50">{localStock}</Text>
            </View>
          </View>

          <View className='flex flex-row gap-3 mt-2'>
            <TouchableOpacity
              className={`p-1 rounded ${localStock === 0 ? 'bg-gray-300' : 'bg-red-500'}`}
              onPress={handleDecrement}
              disabled={localStock === 0}
            >
              <AntDesign name="minus" size={12} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              className={`p-1 rounded ${localStock === maxStock ? 'bg-gray-300' : 'bg-primary'}`}
              onPress={handleIncrement}
              disabled={localStock === maxStock}
            >
              <AntDesign name="plus" size={12} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text className='text-sm text-gray-700'>Keuntungan Satuan</Text>
          <Text className='text-xl text-center'>Rp. {price}</Text>
        </View>
      </TouchableOpacity>

      <EditFormLayout
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
