import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import WrapText from './WrapText'
import { readDebt } from '@/utils/actions/debt.action';
import { readAsset } from '@/utils/actions/aset.action';
import { formatRupiah } from '@/utils/libs';

export default function HutangAsetMode() {
    const [totalBebanUsaha, setTotalBebanUsaha] = useState<number>(0);
      const [totalAset, setTotalAset] = useState<number>(0);
      useEffect(() => {
        try {
     
          const debtData = readDebt();   
          const assetData = readAsset(); 
    
          
          const totalHutang = debtData.reduce((sum, item) => sum + (item.nominal || 0), 0);
          
          
          const totalAsset = assetData.reduce((sum, item) => sum + (item.nominal || 0), 0);
    
          setTotalBebanUsaha(totalHutang);
          setTotalAset(totalAsset); 
    
        } catch (error) {
          console.error("Error fetching asset or debt data:", error);
        }
      }, []); 
  return (
    <View>
        <Text className='font-semibold text-lg mt-4 uppercase'>Pendapatan</Text>
        <Text>ASET (HARTA)</Text>
        <WrapText 
            label='Peralatan (Etalase, Kulkas, dll)'
            value={totalAset}
        />
        <WrapText 
            label='Total Aset'
            value={totalAset}
        />
        <Text className='font-semibold text-lg mt-4 uppercase'>Hutang (Kewajiban)</Text>
        <WrapText 
            label='Utang Usaha'
            value={totalBebanUsaha}
        />
        <WrapText 
            label='Total Hutang'
            value={totalBebanUsaha}
        />
    </View>
  )
}