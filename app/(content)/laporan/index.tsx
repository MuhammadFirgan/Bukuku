import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import TransactionPieChart from '@/components/TransactionPieChart'
import BebanUsahaChart from '@/components/BebanUsahaChart'
import { Barang } from '@/types';
import { readBarang } from '@/utils/actions/persediaan.action';
import { readStock } from '@/utils/actions/stock.action';
import { formatRupiah } from '@/utils/libs';
import VentureSection from '@/components/VentureSection';
import LaporanModal from '@/components/LaporanModal';

export default function Index() {
  const [totalPengeluaran, setTotalPengeluaran] = useState<number>(0);
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [stockItems, setStockItems] = useState<any[]>([]); 
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [totalKeuntungan, setTotalKeuntungan] = useState<number>(0);
  const [totalPendapatan, setTotalPendapatan] = useState(0)

  try {
    useEffect(() => {

      const computeKeuangan = async () => {
        try {
          const barang = await readBarang();
          const stock = (await readStock())?.items ?? [];
          setBarangList(barang);
          setStockItems(stock); // Simpan stok ke state
  
          let pengeluaran = 0;

  
          barang.forEach((b) => {
            const logBarang = stock.filter((log) => log.barang_id === b.id);
            const masukLogs = logBarang.filter((log) => log.type === 'in');
  
            const totalMasuk = masukLogs.reduce((sum, log) => sum + (log.amount ?? 0), 0);
            
            pengeluaran += totalMasuk * b.harga_beli;
          });
          const totalKeuntungan = barang.reduce((sum, item) => sum + (item.keuntungan ?? 0), 0);
          
          const totalBenefit = barang.reduce((sum, item) => sum + item.harga_jual, 0);
          setTotalPendapatan(totalBenefit)
          setTotalKeuntungan(totalKeuntungan); 
          setTotalPengeluaran(pengeluaran);
        } catch (error) {
          console.error('❌ Error in computeKeuangan:', error);
        }
      };
      computeKeuangan();
    }, [])

  } catch (error) {
    console.error(error)
  }
  return (
    <ScrollView>
      <View className='m-5'>

        <View className='bg-white rounded-xl'>
          <TransactionPieChart 
            totalPendapatan={totalPendapatan}
            totalPengeluaran={totalPengeluaran}
          />
        </View>
        <View className='flex flex-row justify-center gap-5 mt-4'>
          <View className='bg-white p-3 rounded-xl flex items-center'>
            <Text className='text-lg font-semibold'>Total Keuntungan</Text>
            <Text className='text-green-500 font-semibold'>{formatRupiah(totalPendapatan)}</Text>
          </View>
          <View className='bg-white p-3 rounded-xl flex items-center'>
            <Text className='text-lg font-semibold'>Total Modal</Text>
            <Text className='text-red-500 font-semibold'>{formatRupiah(totalPengeluaran)}</Text>
          </View>
        </View>
        {/* <Text className='m-4 font-semibold text-lg uppercase'>Beban Usaha</Text>
        <View className='bg-white rounded-xl'>
          <BebanUsahaChart 
            totalPendapatan={200}
            totalPengeluaran={200}
          />
        </View>
        <Text className='m-4 font-semibold text-lg uppercase'>Hutang Usaha</Text>
        <View className='bg-white p-3 rounded-xl flex items-center flex-row justify-between py-5 px-3'>
          <Text className='text-lg font-semibold text-gray-500'>Total Hutang Usaha</Text>
          <Text className='text-red-500 font-semibold'>Rp 5.500.000</Text>
        </View>
        <Text className='m-4 font-semibold text-lg uppercase'>Aset</Text>
        <View className='bg-white p-3 rounded-xl flex items-center flex-row justify-between py-5 px-3'>
          <Text className='text-lg font-semibold text-gray-500'>Nilai Aset Bertambah</Text>
          <Text className='text-green-500 font-semibold'>Rp 5.500.000</Text>
        </View> */}
        <VentureSection totalKeuntungan={totalKeuntungan}/>
        <TouchableOpacity className='bg-white p-3 rounded-xl py-5 px-3 mt-8 bg-primary' onPress={() => setModalOpen(!modalOpen)}>
          <Text className='text-center font-semibold text-white'>Rincian Laporan Keuangan</Text>
        </TouchableOpacity>
        <LaporanModal 
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </View>
      
    </ScrollView>
  )
}