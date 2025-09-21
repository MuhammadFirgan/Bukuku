import { View, Text } from 'react-native'

type Props = {
  nama_barang: string;
  amount: number;
  harga_jual: number;
  // harga_beli: number;
}

export default function ListPenjualan({ nama_barang, amount, harga_jual }: Props) {
  if (amount <= 0) {
    return null;
  }
  return ( 
    <View className='p-5 flex flex-row justify-between items-center border-b border-gray-300'>
      <View className='flex w-[30%]'>
        <Text className='font-semibold' numberOfLines={1} ellipsizeMode="tail">{nama_barang}</Text>
        <Text className='text-gray-400'>Terjual : {amount}</Text>
      </View>
      <View className='flex items-center'>
        <Text className='text-gray-500'>Harga Satuan</Text>
        <Text className='text-red-500'>{harga_jual.toLocaleString('id-ID')}</Text>
      </View>
      <View className='flex items-center'>
        <Text className='text-gray-500'>Keuntungan</Text>
        <Text className='text-primary'>Rp {(harga_jual * amount).toLocaleString('id-ID')}</Text>
      </View>
    </View>
  )
}