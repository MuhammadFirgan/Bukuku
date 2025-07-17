
import { Slot } from 'expo-router'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function layout() {
  return (
    <SafeAreaView>
      <View className='bg-primary h-48 rounded-b-2xl'>
        <View className='flex justify-center items-center flex-col flex-1 gap-3'>
          <Text className='text-white text-3xl font-semibold uppercase'>Persediaan</Text>
        </View>
      </View>
      <Slot />
    </SafeAreaView>
  )
}