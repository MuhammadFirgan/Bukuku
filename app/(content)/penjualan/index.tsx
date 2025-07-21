import { View, Text } from 'react-native'
import { usePageSetup } from '@/utils/libs'


export default function Index() {
    usePageSetup('Penjualan', <Text>Penjualan</Text>)
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}