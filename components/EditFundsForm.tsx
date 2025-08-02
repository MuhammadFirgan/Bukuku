import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import ModalLayout from './ModalLayout'
import { ModalTrigger } from '@/types'
import { useState } from 'react'

export default function EditFundsForm() {
    const [fundsValue, setFundsValue] = useState('')
  return (
    <View className='gap-3'>
        <TextInput 
            className='w-96 border border-gray-400 text-xs rounded-xl px-4 py-3'
            keyboardType='numeric'
        />
        <TouchableOpacity className='bg-primary w-full p-3 rounded-lg'>
            <Text className='text-white text-center'>Ubah Dana Operasional</Text>
        </TouchableOpacity>
    </View>
  )
}