import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { readFunds, readItems } from '@/utils/actions/operational.action';
import WrapText from './WrapText';

export default function LaporanOperasional({ totalKeuntungan }: { totalKeuntungan: number }) {
    const [totalAmount, setTotalAmount] = useState('0');
    const [currentAmount, setCurrentAmount] = useState(0);
    const [items, setItems] = useState<any[]>([]);
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
        const funds = await readFunds();
        setTotalAmount(funds.toString());
    };
    
  return (
    <View>

        <Text className='font-semibold text-lg mt-4 uppercase'>Beban Operasional</Text>
        {items.map(item => (
            <WrapText
                key={item.id} 
                label={item.name}
                value={item.price}
            />
        ))}
        
        <WrapText 
            label='Total Beban Operasional'
            value={currentAmount}
        />
        <WrapText 
            label='LABA BERSIH'
            value={totalKeuntungan - currentAmount}
            isBold
        />
    </View>
  )
}