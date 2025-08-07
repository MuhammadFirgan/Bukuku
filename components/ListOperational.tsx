import { View, Text, TouchableOpacity } from 'react-native'
import { formatRupiah } from '@/utils/libs';
import { useState } from 'react';
import EditOperationalForm from './EditOperationalForm';

interface listOperationalProps {
    id: string
    name: string
    price: number
}

export default function ListOperational({ name, price, id }: listOperationalProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <View>
        <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            <View className="flex flex-row justify-between p-4 bg-white rounded-lg mt-4">
                <Text className="text-gray-400 font-semibold">{name}</Text>
                <Text className="text-red-500">{formatRupiah(price)}</Text>
            </View>
        </TouchableOpacity>
        <EditOperationalForm 
            visible={isModalOpen}
            id={id}
            onClose={() => setIsModalOpen(false)}
        />
    </View>
  )
}