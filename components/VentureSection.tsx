import { View, Text } from 'react-native';
import BebanUsahaChart from './BebanUsahaChart';
import { useEffect, useState } from 'react';
import { CreateAssetForm } from '@/types';

import { formatRupiah, usePageSetup } from '@/utils/libs';
import { readDebt } from '@/utils/actions/debt.action';
import { readAsset } from '@/utils/actions/aset.action';

export default function VentureSection({ totalKeuntungan }: { totalKeuntungan: number }) {
  const [totalBebanUsaha, setTotalBebanUsaha] = useState<number>(0);
  const [totalAset, setTotalAset] = useState<number>(0); // Opsional, jika butuh nanti

  useEffect(() => {
    try {
 
      const debtData = readDebt();   
      const assetData = readAsset(); 

      
      const totalHutang = debtData.reduce((sum, item) => sum + (item.nominal || 0), 0);
      
      
      const totalAsset = assetData.reduce((sum, item) => sum + (item.nominal || 0), 0);

      setTotalBebanUsaha(totalHutang);
      setTotalAset(totalAsset); 

      console.log("Total Hutang (Beban Usaha):", totalHutang);
      console.log("Total Aset:", totalAsset);
    } catch (error) {
      console.error("Error fetching asset or debt data:", error);
    }
  }, []); 

  usePageSetup(
      <View className='flex flex-col justify-center items-center'>
          <Text className='text-4xl text-white font-semibold uppercase'>Laporan</Text>
      </View>,
      false,
  );

    
  return (
    <View>
      <Text className='m-4 font-semibold text-lg uppercase'>Beban Usaha</Text>
      <View className='bg-white rounded-xl'>
        <BebanUsahaChart 
          totalKeuntungan={totalKeuntungan}
          totalBebanUsaha={totalBebanUsaha}
        />
      </View>

      <Text className='m-4 font-semibold text-lg uppercase'>Hutang Usaha</Text>
      <View className='bg-white p-3 rounded-xl flex items-center flex-row justify-between py-5 px-3'>
        <Text className='text-lg font-semibold text-gray-500'>Total Hutang Usaha</Text>
        <Text className='text-red-500 font-semibold'>{formatRupiah(totalBebanUsaha)}</Text>
      </View>

      <Text className='m-4 font-semibold text-lg uppercase'>Aset</Text>
      <View className='bg-white p-3 rounded-xl flex items-center flex-row justify-between py-5 px-3'>
        <Text className='text-lg font-semibold text-gray-500'>Nilai Aset Bertambah</Text>
        <Text className='text-green-500 font-semibold'>{formatRupiah(totalAset)}</Text>
      </View>
    </View>
  );
}