import { View, Text, TextInput, TouchableOpacity } from 'react-native'

export default function EditStockForm({ id, stockAwal }: { id?: string; stockAwal?: number }) {
  if(!id) return null

  return (
    <View className='flex flex-row justify-center gap-4 px-4'>

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
      <View className='flex flex-col justify-end items-center gap-2'>
        <Text>hahha</Text>
        <Text className='text-red-500'>Gagal</Text>
        <TouchableOpacity 
        className='bg-primary text-center px-4 py-2 rounded-lg' 
        // onPress={handleEditPrice}
        >
          <Text className='text-white'>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
