import { Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import CustomText from './CustomText'


export default function DashboardCard({ item, index }: any) {
    const { width } = useWindowDimensions()
    const itemSize = width / 2

    const isLeftColumn = index % 2 === 0
    const isLastRow = index >= 6 - 2  
  
    return (
    <TouchableOpacity 
        style={{
            width: itemSize,
            height: itemSize,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: isLeftColumn ? 1 : 0,
            borderBottomWidth: !isLastRow ? 1 : 0,
            borderColor: 'white',
        }}
        className="bg-[#8AC9AF]"
        //  onPress={() => router.push(menu.route)}
        >
        <Image source={item.icon} className="size-32 mb-3" resizeMode="contain"/>
        <CustomText className='text-white font-semibold text-xl'>{item.label}</CustomText>

    </TouchableOpacity>
  )
}