import CountCard from '@/components/CountCard'
import CreateFormLayout from '@/components/CreateFormLayout'
import ListItems from '@/components/ListItems'
import { readBarang } from '@/utils/actions/persediaan.action'
import { readStock } from '@/utils/actions/stock.action'
import { stockEvents } from '@/utils/event/stock.event'
import { totalMasuk, usePageSetup } from '@/utils/libs'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { useEffect, useMemo, useState } from 'react'
import { View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native'

export default function Index() {

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [listBarang, setListBarang] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [stockList, setStockList] = useState<any[]>([]);

    usePageSetup('Persediaan', false)

    const fetchStock = () => {
      const result = readStock()
      if (!result) return
      const sorted = Object.values(result)
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      setStockList(sorted)
    }
  
    useEffect(() => {
      fetchStock()
      stockEvents.on(fetchStock)
      return () => {
        stockEvents.off(fetchStock)
      }
    }, [])
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await readBarang();
          setListBarang(result);
        } catch (err) {
          setError('Gagal memuat data barang');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    
      stockEvents.on(fetchData);
    
      return () => {
        stockEvents.off(fetchData);
      }; // <- ini yang kamu lupa tutup
    }, []);
    

    const totalMasuk = useMemo(() =>
      stockList.filter(item => item.type === 'in')
        .reduce((acc, item) => acc + (item.amount || 0), 0),
      [stockList]
    )
  
    const totalKeluar = useMemo(() =>
      stockList.filter(item => item.type === 'out')
        .reduce((acc, item) => acc + (item.amount || 0), 0),
      [stockList]
    )

    const totalQuantity = useMemo(() =>
      listBarang.reduce((total, item) => total + Number(item.quantity || 0), 0),
      [listBarang]
    )

    const validBarang = useMemo(() =>
      listBarang.filter(
        item =>
          item &&
          item.nama_barang &&
          !isNaN(item.harga_jual - item.harga_beli)
      ), [listBarang])


    console.log(totalMasuk)
    if (loading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text className="mt-2 text-gray-600">Memuat data...</Text>
        </View>
      )
    }
  
    if (error) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">{error}</Text>
        </View>
      )
    }

    // tinggal buat bagian modal
return (
    <View className='w-full '>
        <View className='flex flex-row flex-wrap -mt-14 px-7'>
            <CountCard 
                label='Persediaan'
                value={totalQuantity}
            />
            <CountCard 
                label='Barang'
                value={listBarang.length.toString()}
            />
            <CountCard 
                label='Barang Masuk'
                value={totalMasuk}
            />
            <CountCard 
                label='Barang Keluar'
                value={totalKeluar}
            />
            
        </View>
        <View className='flex flex-row items-center gap-4 pt-8 px-7 mb-5'>
            <View className='relative'>
                <EvilIcons name="search" size={24} color="black" className='absolute top-1/2 -translate-y-1/2 left-3' />
                <TextInput className='border border-gray-400 w-72 rounded-xl placeholder:pl-10' placeholder='Search...'/>
            </View>
            <TouchableOpacity 
                className='p-3 bg-primary rounded-xl mr-4' 
                onPress={() => setModalOpen(!modalOpen)}>
                <Text>Tambah Barang</Text>
            </TouchableOpacity>
           <CreateFormLayout 
                visible={modalOpen}
                onClose={() => setModalOpen(false)}
           />
        </View>
        <View className='flex-1'>

        </View>
          <FlatList 
              data={validBarang}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
              renderItem={({item}) => (
                <ListItems 
                    id={item.id}
                    name={item.nama_barang}
                    price={item.harga_jual - item.harga_beli}
                    stock={item.quantity}
                    
                />
              )}
          />

        
    </View>
  )
}