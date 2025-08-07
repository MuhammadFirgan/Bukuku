import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import ModalLayout from './ModalLayout';
import { ModalTrigger } from '@/types';
import { useEffect, useState } from 'react';
import { readOperationalById, updateItems } from '@/utils/actions/operational.action';
import { router } from 'expo-router';

export default function EditOperationalForm({ visible, onClose, id, onSave }: ModalTrigger & { onSave?: () => void }) {
  const [namaBiaya, setNamaBiaya] = useState('');
  const [nominal, setNominal] = useState('');

  useEffect(() => {
    if (!id) return;

    const currentBarang = readOperationalById(id);
    if (currentBarang) {
      setNamaBiaya(currentBarang.name || '');
      setNominal(currentBarang.price ? currentBarang.price.toString() : '');
      console.log('Item loaded:', currentBarang);
    }
  }, [id]);

  const handleEditPrice = async () => {
    if (!id) return;

    const trimmedNama = namaBiaya.trim();
    const parsedNominal = parseInt(nominal);

    console.log('Form input:', { trimmedNama, nominal, parsedNominal });

    if (!trimmedNama) {
      Alert.alert('Error', 'Nama biaya tidak boleh kosong');
      return;
    }

    if (isNaN(parsedNominal) || parsedNominal < 0) {
      Alert.alert('Error', 'Nominal harus berupa angka valid dan tidak negatif');
      return;
    }

    try {
      const success = await updateItems(id, trimmedNama, parsedNominal);
      if (success) {
        router.push('/operasional')
      } else {
        Alert.alert('Error', 'Gagal memperbarui biaya: Item tidak ditemukan');
      }
    } catch (error) {
      console.error('Gagal menyimpan perubahan:', error);
      Alert.alert('Error', 'Gagal menyimpan perubahan');
    }
  };

  if (!id) return null;

  return (
    <ModalLayout headerTitle="Edit Biaya" visible={visible} onClose={onClose}>
      <View className="flex flex-col gap-2 items-center mt-6">
        <View className="flex flex-row items-center gap-5">
          <Text className="w-24 text-left">Nama biaya</Text>
          <TextInput
            className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1"
            value={namaBiaya}
            onChangeText={setNamaBiaya}
            placeholder="Masukkan nama biaya"
          />
        </View>

        <View className="flex flex-row items-center gap-5">
          <Text className="w-24 text-left">Nominal</Text>
          <TextInput
            className="border border-gray-400 w-40 text-xs rounded-xl px-2 py-1"
            keyboardType="numeric"
            value={nominal}
            onChangeText={setNominal}
            placeholder="Masukkan nominal"
          />
        </View>
        <TouchableOpacity
          className="bg-primary w-1/2 text-center px-4 py-2 rounded-lg"
          onPress={handleEditPrice}
        >
          <Text className="text-center text-white">Simpan</Text>
        </TouchableOpacity>
      </View>
    </ModalLayout>
  );
}