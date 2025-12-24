import { View, Text } from 'react-native';
import React from 'react';
import { formatRupiah } from '@/utils/libs';

export default function WrapText({ 
  label, 
  value, 
  isBold = false 
}: { 
  label: string; 
  value: number; 
  isBold?: boolean; 
}) {
  const isNegative = value < 0;
  const valueTextColor = isNegative ? 'text-red-500' : 'text-black';

  const displayValue = formatRupiah(value); 
  return (
    <View className='flex justify-between flex-row'>
      <Text className={`${isBold ? 'font-semibold' : 'font-normal'} text-gray-700`}>
        {label}
      </Text>
      <Text className={`${isBold ? 'font-semibold' : 'font-normal'} ${valueTextColor}`}>
        {displayValue}
      </Text>
    </View>
  );
}