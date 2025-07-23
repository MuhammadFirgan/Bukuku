import { View, Text, TextInput } from 'react-native'

export default function EditStockForm({id}: {id?: string}) {
  if(!id) return null

  return (
    <View className='flex flex-col gap-3'>
      <View className="flex flex-row items-center gap-2">
        <Text className="text-left">Stock Awal</Text>
        <TextInput className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1" />
      </View>

      <View className="flex flex-row items-center">
        <Text className="w-24 text-left">Harga Beli</Text>
        <TextInput className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1" />
      </View>

      <View className="flex flex-row items-center">
        <Text className="w-24 text-left">Total Stock</Text>
        <TextInput
          className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1 opacity-50"
          editable={false}
        />
      </View>
    </View>
  )
}
