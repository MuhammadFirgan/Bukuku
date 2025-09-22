import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { ListItemsProps } from '@/types';
import { useEffect, useState } from 'react';
import EditFormLayout from './EditFormLayout';
import { updateStockWithLog } from '@/utils/actions/stock.action';

export default function ListItems({ name, price, stock, id }: ListItemsProps) {
  const [localStock, setLocalStock] = useState<number>(stock);
  const [dirty, setDirty] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [stockChangeType, setStockChangeType] = useState<'in' | 'out' | null>(null);

  const maxIncrement = 5;

  const handleIncrement = () => {
    setLocalStock(prev => prev + 1);
    setStockChangeType('in');
    setDirty(true);
  
  };

  const handleDecrement = () => {
    setLocalStock(prev => prev - 1);
    setDirty(true);
    setStockChangeType('out');
 
  };

  useEffect(() => {
    if (!dirty) return;

    const timeout = setTimeout(() => {
      updateStockWithLog(id, localStock)
      setDirty(false);
      setStockChangeType(null);
    }, 500);

    return () => clearTimeout(timeout);
  }, [localStock, dirty,id]);

  const borderClassName = stockChangeType === 'in' ? 'border-green-500' : (stockChangeType === 'out' ? 'border-red-500' : 'border-transparent');
  const hasBorder = stockChangeType !== null;

  return (
    <View className={`bg-white rounded-lg p-4 my-2 flex-row justify-between items-center ${hasBorder ? `border-2 ${borderClassName}` : ''}`}>
      <TouchableOpacity 
        onPress={() => setIsModalOpen(true)}
        className='flex flex-row justify-between items-center flex-1'
      >
        <View>
          <Text className='text-lg'>{name}</Text>
          <Text className='text-sm text-gray-600'>Stock Tersedia : {localStock}</Text>
        </View>

        <View className='flex flex-col items-center'>
          <View className="flex flex-row items-end gap-2 space-x-2">
            <Text className="text-xs">Stock :</Text>
            <View className="flex flex-col items-center">
              <Text className="text-xs">Max Tambah : 5</Text>
              <Text className="border w-16 text-black text-xs text-center py-0 opacity-50">{localStock}</Text>
            </View>
          </View>
          <View className='flex flex-row gap-3 mt-2'>
            <TouchableOpacity
              className={`p-1 rounded ${localStock <= 0 ? 'bg-gray-300' : 'bg-red-500'}`}
              onPress={handleDecrement}
              disabled={localStock <= 0}
            >
              <AntDesign name="minus" size={12} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className={`p-1 rounded ${localStock >= stock + 5 ? 'bg-gray-300' : 'bg-primary'}`}
              onPress={handleIncrement}
              disabled={localStock >= stock + 5}
            >
              <AntDesign name="plus" size={12} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text className='text-sm text-gray-700'>Keuntungan Satuan</Text>
          <Text className={`text-xl text-center ${price < 0 ? 'text-red-500' : 'text-black'}`}>Rp. {price}</Text>
        </View>
      </TouchableOpacity>
      
      <EditFormLayout
        visible={isModalOpen}
        id={id}
        onClose={() => setIsModalOpen(false)}
      />
    </View>
    // <View className={`${hasBorder ? `border-2 ${borderClassName}` : ''}`}>
    //   <TouchableOpacity 
    //     onPress={() => setIsModalOpen(true)}
    //     className='flex flex-row justify-between bg-white items-center px-2 py-4 my-2'>
        
    //     <View>
    //       <Text className='text-lg'>{name}</Text>
    //       <Text className='text-sm text-gray-600'>Stock Tersedia : {localStock}</Text>
    //     </View>

    //     <View className='flex flex-col items-center'>
    //       <View className="flex flex-row items-end gap-2 space-x-2">
    //         <Text className="text-xs">Stock :</Text>
    //         <View className="flex flex-col items-center">
    //           <Text className="text-xs">Max Tambah : 5</Text>
    //           <Text className="border w-16 text-black text-xs text-center py-0 opacity-50">{localStock}</Text>
    //         </View>
    //       </View>

    //       <View className='flex flex-row gap-3 mt-2'>
    //         <TouchableOpacity
    //           className={`p-1 rounded ${localStock <= 0 ? 'bg-gray-300' : 'bg-red-500'}`}
    //           onPress={handleDecrement}
    //           disabled={localStock <= 0}
    //         >
    //           <AntDesign name="minus" size={12} color="white" />
    //         </TouchableOpacity>

    //         <TouchableOpacity
    //           className={`p-1 rounded ${localStock >= maxIncrement ? 'bg-gray-300' : 'bg-primary'}`}
    //           onPress={handleIncrement}
    //           disabled={localStock >= maxIncrement}
    //         >
    //           <AntDesign name="plus" size={12} color="white" />
    //         </TouchableOpacity>
    //       </View>
    //     </View>

    //     <View>
    //       <Text className='text-sm text-gray-700'>Keuntungan Satuan</Text>
    //       <Text className={`text-xl text-center ${price < 0 ? 'text-red-500' : 'text-black'}`}>Rp. {price}</Text>
    //     </View>
    //   </TouchableOpacity>

    //   <EditFormLayout
    //     visible={isModalOpen}
    //     id={id}
    //     onClose={() => setIsModalOpen(false)}
    //   />
    // </View>
  );
}
