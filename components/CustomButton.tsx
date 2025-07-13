import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'

export default function CustomButton({ text, onPress }: CustomButtonProps) {
  return (
    <TouchableOpacity className='bg-primary w-72 flex justify-center items-center py-2 rounded-full' onPress={onPress}>
      <Text className='text-xl uppercase text-white w-full text-center'>{text}</Text>
    </TouchableOpacity>
  )
}