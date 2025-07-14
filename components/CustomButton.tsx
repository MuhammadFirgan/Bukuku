import { ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'
import CustomText from './CustomText'

export default function CustomButton({ text, onPress, loading = false, disable = false }: CustomButtonProps) {
  return (
    <TouchableOpacity className={`bg-primary w-72 flex justify-center items-center py-2 rounded-full ${disable ? 'opacity-50' : ''}`} onPress={onPress} disabled={disable || loading}>
      {loading ? (
        <ActivityIndicator size="small" color="ffff"/>
      ) : (

        <CustomText className='text-xl uppercase text-white w-full text-center'>{text}</CustomText>
      )}
    </TouchableOpacity>
  )
}