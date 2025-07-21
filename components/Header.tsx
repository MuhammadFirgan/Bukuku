import { View, Text } from 'react-native'
import React from 'react'
import { useHeaderTitle } from '@/utils/context/HeaderContext'

export default function Header() {
    const { title } = useHeaderTitle()
  return (
    <View className='bg-primary h-48 rounded-b-2xl'>
        <View className='flex justify-center items-center flex-col flex-1 gap-3'>
            <Text className='text-white text-3xl font-semibold uppercase'>{title}</Text>
        </View>
    </View>
  )
}