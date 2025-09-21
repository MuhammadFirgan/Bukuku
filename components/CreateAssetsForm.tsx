import { View, Text, TextInput } from 'react-native'
import CustomButton from './CustomButton'


export default function CreateAssetsForm() {
  return (
    <View className='bg-white p-4 mx-4 rounded-xl'>
      <Text className='text-center text-gray-700 font-semibold'>Tambahkan Aset Usaha</Text>
      <View>
        <View className='flex flex-row items-center gap-5 mt-4'>
            <Text className='w-1/4'>Keterangan</Text>
            <TextInput 
                className='border border-gray-400 w-1/2 text-xs rounded-xl px-2 py-1'
            />
        </View>
        <View className='flex flex-row items-center gap-5 mt-4'>
            <Text className='w-1/4'>Nominal</Text>
            <TextInput 
                className='border border-gray-400 w-1/2 text-xs rounded-xl px-2 py-1'
            />
        </View>
        <View className='flex flex-row items-center gap-5 mt-4'>
            <Text className='w-1/4'>Categori</Text>
            <TextInput 
                className='border border-gray-400 w-1/2 text-xs rounded-xl px-2 py-1'
            />
        </View>
        <CustomButton 
            text='Simpan' 
            className='bg-primary text-center px-4 py-2 rounded-lg mx-5 mt-7' 
            onPress={() => {}}
        />
      </View>
    </View>
  )
}