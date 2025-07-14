import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { CustomInputProps } from '@/types'
import CustomText from './CustomText'

export default function CustomInput({ 
  label, 
  password = false, 
  onChangeText,
  value
 }: CustomInputProps) {
  return (
    <View className='flex justify-center flex-col items-center w-full gap-4'>
      <CustomText weight='semibold' className='text-lg font-semibold uppercase'>{label}</CustomText>
      <TextInput 
        className='border rounded-full w-72 text-primary bg-white px-8'
        secureTextEntry={password}
        onChangeText={onChangeText}
        value={value}
        style={{ fontFamily: 'poppins-md' }} 
      />
    </View>
  )
}