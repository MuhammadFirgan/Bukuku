// CreateModalOperasional.jsx
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import ModalLayout from './ModalLayout';
import { ModalTrigger } from '@/types';
import { createItems } from '@/utils/actions/operational.action';

export default function CreateModalOperasional({
  visible,
  onClose,
  onItemCreated,
  totalAmount,
  currentAmount,
}: ModalTrigger & { onItemCreated: (price: number) => void; totalAmount: string; currentAmount: number }) {
  const [namaBarang, setNamaBarang] = useState<string>('');
  const [hargaBarang, setHargaBarang] = useState<number>(0);

  const handleCreate = async () => {
    if (!namaBarang || !hargaBarang || hargaBarang <= 0) {
      Alert.alert('Error', 'Masukkan nama barang dan harga yang valid');
      return;
    }
    if (currentAmount + hargaBarang > parseFloat(totalAmount)) {
      Alert.alert('Error', 'Saldo tidak mencukupi untuk menambahkan barang ini');
      return;
    }

    const result = await createItems({ name: namaBarang, price: hargaBarang });
    if (result) {
      setNamaBarang('');
      setHargaBarang(0);
      onItemCreated(result.price);
      onClose();
    }
  };

  return (
    <ModalLayout headerTitle="BARANG BARU" buttonLabel="Barang Baru" visible={visible} onClose={onClose}>
      <View className="flex flex-row gap-4 px-4 mt-12">
        <View className="flex flex-col gap-4">
          <View className="flex flex-row items-center gap-5">
            <Text className="text-right">Nama Barang</Text>
            <TextInput
              className="border border-gray-400 w-72 text-xs rounded-xl px-2 py-1"
              value={namaBarang}
              onChangeText={setNamaBarang}
              placeholder="Masukkan nama barang"
            />
          </View>

          <View className="flex flex-row items-center gap-5">
            <Text className="text-right">Harga Barang</Text>
            <TextInput
              className="border border-gray-400 w-72 text-xs rounded-xl px-2 py-1"
              value={hargaBarang.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setHargaBarang(Number(text))}
              placeholder="Masukkan harga barang"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity className="bg-primary text-center px-4 py-2 rounded-lg mx-5 mt-7" onPress={handleCreate}>
        <Text className="text-white text-center">Simpan</Text>
      </TouchableOpacity>
    </ModalLayout>
  );
}