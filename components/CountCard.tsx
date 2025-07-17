
import { View, Text } from 'react-native'

interface CountCardProps {
    label: string
    value: string
}

export default function CountCard({ label, value }: CountCardProps) {
  return (
    <View className='w-1/2 p-2'>
      <View className='bg-white rounded-xl shadow-md flex flex-col justify-center items-center h-32 p-4'>
        <Text className='uppercase text-gray-600 text-sm text-center'>{label}</Text>
        <Text className='text-2xl font-bold'>{value}</Text>
      </View>
    </View>
  )
}
