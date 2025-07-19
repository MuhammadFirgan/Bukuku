import { View, Text, TextInput } from 'react-native'

export default function EditPriceForm() {
  return (
    <>
      <View className="flex flex-row items-center">
        <Text className="w-24 text-left">Harga Beli</Text>
        <TextInput className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1" />
      </View>

      <View className="flex flex-row items-center">
        <Text className="w-24 text-left">Harga Jual</Text>
        <TextInput className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1" />
      </View>
    </>
  )
}
