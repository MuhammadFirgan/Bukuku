import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { CustomInputProps } from '@/types'

export default function CustomInput({ label, password = false }: CustomInputProps) {
  return (
    <View className='flex justify-center flex-col items-center w-full gap-4'>
      <Text className='text-lg font-semibold uppercase'>{label}</Text>
      <TextInput 
        className='border rounded-full w-72 text-primary bg-white px-8'
        secureTextEntry={password}
      />
    </View>
  )
}