// Index.jsx
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { formatRupiah, usePageSetup } from '@/utils/libs';
import Dropdown from '@/components/Dropdown';
import { readFunds, readItems } from '@/utils/actions/operational.action';
import EditFundsForm from '@/components/EditFundsForm';
import CreateModalOperasional from '@/components/CreateModalOperasional';

export default function Index() {
  const [periode, setPeriode] = useState('PERIODE 1');
  const [modalOpen, setModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState('0');
  const [currentAmount, setCurrentAmount] = useState(0); // Inisialisasi ke 0, akan dihitung dari items$
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchFunds = async () => {
      const resultAmount = await readFunds();
      setTotalAmount(resultAmount.toString());
    };
    fetchFunds();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      const itemList = await readItems();
      setItems(itemList);
      // Hitung currentAmount dari total harga barang
      const totalPrice = itemList.reduce((sum, item) => sum + (item.price || 0), 0);
      setCurrentAmount(totalPrice);

    };
    fetchItems();
  }, []);

  const handleFundsUpdated = async () => {
    const resultAmount = await readFunds();
    setTotalAmount(resultAmount.toString());
  
  };

  const handleItemCreated = async (price: number) => {
    const newAmount = currentAmount + price;
    setCurrentAmount(newAmount);
    const itemList = await readItems();
    setItems(itemList);
  };

  const percentage = totalAmount && parseFloat(totalAmount) > 0 ? (currentAmount / parseFloat(totalAmount)) * 100 : 0;

  usePageSetup(
    'Operasional',
    true,
    <View className="bg-white mx-4 p-4 -mt-8 rounded-lg flex flex-row justify-between items-center">
      <View>
        <Text className="text-lg font-semibold">Total Beban</Text>
        <Text className="text-sm text-gray-400">Biaya untuk operasional toko</Text>
      </View>
      <Text className="text-xl text-red-500 font-semibold">{formatRupiah(currentAmount)}</Text>
    </View>
  );

  return (
    <View className="mx-4 flex-1">
      <View className="px-6 py-5 bg-white -mt-10 rounded-lg">
        <View className="flex flex-col gap-3">
          <EditFundsForm onFundsUpdated={handleFundsUpdated} />
          <View>
            <Text>Dana Operasional saat ini</Text>
            <Text>
              Rp {formatRupiah(currentAmount)} dari Rp {formatRupiah(parseInt(totalAmount))}
            </Text>
            <View className="w-3/4 h-1 bg-gray-200 mt-2 rounded-full overflow-hidden flex-row">
              <View className="h-1 bg-red-500" style={{ width: `${percentage}%` }} />
              <View className="h-1 bg-primary" style={{ width: `${100 - percentage}%` }} />
            </View>
          </View>
        </View>
      </View>

      <View className="flex flex-row justify-between items-center my-5">
        <Dropdown
          options={['PERIODE 1', 'PERIODE 2', 'PERIODE 3', 'PERIODE 4']}
          selected={periode}
          onSelect={setPeriode}
          dropdownWidth="w-1/2"
          optionalBgColor="bg-gray-400"
        />
        <View>
          {currentAmount < parseInt(totalAmount) && (
            <>
              <TouchableOpacity className="px-4 py-3 bg-primary rounded-lg" onPress={() => setModalOpen(!modalOpen)}>
                <Text className="text-white">Tambah Barang</Text>
              </TouchableOpacity>
              <CreateModalOperasional
                visible={modalOpen}
                onClose={() => setModalOpen(false)}
                onItemCreated={handleItemCreated}
                totalAmount={totalAmount}
                currentAmount={currentAmount} // Teruskan currentAmount
              />
            </>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        <View>
          <Text className="uppercase font-semibold text-gray-600">History Pembayaran Biaya</Text>
          <View className="flex flex-col gap-4 mt-4">
            {items.length > 0 ? (
              items.map((item) => (
                <View key={item.id} className="flex flex-row justify-between p-4 bg-white rounded-lg">
                  <Text className="text-gray-400 font-semibold">{item.name}</Text>
                  <Text className="text-red-500">{formatRupiah(item.price)}</Text>
                </View>
              ))
            ) : (
              <Text className="text-gray-400">Belum ada barang</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}