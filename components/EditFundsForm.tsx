import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { updateFunds } from '@/utils/actions/operational.action';

export default function EditFundsForm({ onFundsUpdated }: { onFundsUpdated: any }) {
  const [fundsValue, setFundsValue] = useState('');

  const handleUpdateDana = async () => {
    if (!fundsValue || isNaN(parseFloat(fundsValue))) {
      Alert.alert('Error', 'Masukkan angka yang valid');
      return;
    }
    const result = await updateFunds(fundsValue);
    if (result !== null) {
      onFundsUpdated(); // Panggil callback setelah berhasil update
    }
  };

  return (
    <View className="gap-3">
      <TextInput
        className="w-96 border border-gray-400 text-xs rounded-xl px-4 py-3"
        keyboardType="numeric"
        value={fundsValue}
        onChangeText={(value) => setFundsValue(value)}
        placeholder="Masukkan jumlah"
      />
      <TouchableOpacity
        className={`bg-primary w-full p-3 rounded-lg ${!fundsValue ? 'opacity-50' : ''}`}
        onPress={handleUpdateDana}
        disabled={!fundsValue}
      >
        <Text className="text-white text-center">Ubah Dana Operasional</Text>
      </TouchableOpacity>
    </View>
  );
}