import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CustomButton() {
  return (
    <TouchableOpacity className='bg-primary w-72 flex justify-center items-center py-2 rounded-full'>
      <Text className='text-xl uppercase text-white w-full text-center'>Login</Text>
    </TouchableOpacity>
  )
}