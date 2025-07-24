import { readBarangById } from '@/utils/actions/persediaan.action';
import { updateStockWithLog } from '@/utils/actions/stock.action';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function EditStockForm({ id, namaBarang }: { id?: string; namaBarang?: string }) {
  const [stockAwal, setStockAwal] = useState<number>(0);
  const [tambahStock, setTambahStock] = useState<number>(0);
  const [totalStock, setTotalStock] = useState<number>(0);

  useEffect(() => {
    if (!id) return;
    const currentBarang = readBarangById(id);
    if (currentBarang) {
      setStockAwal(currentBarang.quantity || 0);
    }
  }, [id]);

  useEffect(() => {
    setTotalStock(stockAwal + tambahStock);
  }, [stockAwal, tambahStock]);

  const handleEditStock = () => {
    if (!id || tambahStock < 5) return;
    updateStockWithLog(id, totalStock)
    router.push('/persediaan')
  }

 

  return (
    <View className='flex flex-row justify-center gap-4 px-4'>
      <View className='flex flex-col gap-3'>
        <View className="flex flex-row items-center gap-2">
          <Text className="text-left">Stock Awal</Text>
          <TextInput 
            className="border text-center border-gray-400 w-40 text-xs rounded-xl px-2 py-1"
            editable={false}
            value={stockAwal.toString()}   
          />
        </View>

        <View className="flex flex-row items-center">
          <Text className="w-24 text-left">Tambah Stock</Text>
          <TextInput 
            className={`border w-40 text-xs rounded-xl px-2 py-1 text-center ${tambahStock < 5 ? 'border-red-500' : 'border-gray-400'}`}
            keyboardType='numeric'
            value={tambahStock.toString()}
            onChangeText={(text) => {
              const numericValue = parseInt(text, 10);
              setTambahStock(isNaN(numericValue) ? 0 : numericValue);
            }}
          />
        </View>

        <View className="flex flex-row items-center">
          <Text className="w-24 text-left">Total Stock</Text>
          <TextInput
            className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1 opacity-50 text-center"
            editable={false}
            value={totalStock.toString()}
          />
        </View>
      </View>

      {namaBarang && (
        <View className='flex flex-col justify-end items-center gap-2'>
          <Text>{namaBarang}</Text>
          {tambahStock < 5 ? (
            <Text className='text-red-500'>Gagal</Text>
          ) : (
            <Text className='text-primary'>Ok</Text>

          )}
          <TouchableOpacity 
            className='bg-primary text-center px-4 py-2 rounded-lg' 
            onPress={handleEditStock}
          >
            <Text className='text-white'>Simpan</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
