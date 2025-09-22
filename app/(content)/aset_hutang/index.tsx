import { items } from '@/constants'
import { usePageSetup } from '@/utils/libs'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'; // Import useState
import CreateAssetsForm from '@/components/CreateAssetsForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { readAsset } from '@/utils/actions/aset.action';
import { CreateAssetForm } from '@/types';
import { readDebt } from '@/utils/actions/debt.action';


export default function Index() {

    const [activeForm, setActiveForm] = useState('asset');
    const [loading, setLoading] = useState(true);
    const [resultAsset, setResultAsset] = useState<CreateAssetForm[]>([]);


   const fetchingAsset = () => {
        if(activeForm === 'asset') {
            setLoading(true);
            try {
                const data = readAsset();
                setResultAsset(data);
            } catch (error) {
                console.error("Error fetching asset data:", error);
        
            } finally {
                setLoading(false);
            }
        }

        if(activeForm === 'debt') {
            setLoading(true);
            try {
                
                const data = readDebt(); 
                setResultAsset(data);
            } catch (error) {
                console.error("Error fetching debt data:", error);
        
            } finally {
                setLoading(false);
            }
        }
        
   }

   useEffect(() => {
    fetchingAsset()
   }, [activeForm])

   let totalNominal 

   if(activeForm === 'asset') {
    totalNominal = resultAsset.reduce((sum, item) => sum + (item.nominal || 0), 0);
   }

   if(activeForm === 'debt') {
    totalNominal = resultAsset.reduce((sum, item) => sum + (item.nominal || 0), 0);
   }


    usePageSetup(
        <View className='flex flex-col justify-center items-center'>
            <Text className='text-3xl text-white font-semibold'>{activeForm === "asset" ? "Aset Usaha" : "Hutang Usaha"}</Text>
            <Text className='text-4xl text-white font-semibold'>Rp {totalNominal?.toLocaleString('id-ID')}</Text>
        </View>,
        false,
    );

      if (loading) {
        return (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text className="mt-2 text-gray-600">Memuat data...</Text>
          </View>
        );
      }
  

    return (
    <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        extraScrollHeight={100} 
        enableOnAndroid={true} 
        >  
        <View className="flex-1 flex-col gap-4">
            <View className="flex flex-col gap-3 bg-white p-4 mx-4 mt-5 rounded-xl">
                <Text className="text-xl font-semibold px-3 text-center mb-4">{activeForm === 'asset' ? 'Rincian Aset Usaha' : 'Rincian Hutang Usaha'}</Text>
                <View className="flex flex-row justify-center space-x-4 my-2 mx-4 gap-4">
                    <TouchableOpacity
                        onPress={() => setActiveForm('asset')}
                        className={`px-6 py-3 rounded-full ${activeForm === 'asset' ? 'bg-[#8AC9AF]' : 'bg-gray-300'}`}
                    >
                        <Text className="font-semibold text-white">Aset Usaha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setActiveForm('debt')}
                        className={`px-6 py-3 rounded-full ${activeForm === 'debt' ? 'bg-[#8AC9AF]' : 'bg-gray-300'}`}
                    >
                        <Text className="font-semibold text-white">Hutang Usaha</Text>
                    </TouchableOpacity>
                </View>

                {activeForm === 'asset' ? (

                    <View className="flex flex-row justify-between px-2">
                        <Text className="text-xs font-bold">Keterangan</Text>
                        <Text className="text-xs font-bold">Kategori</Text>
                        <Text className="text-xs font-bold">Nominal</Text>
                    </View>
                ) : (
                    <View className="flex flex-row justify-between px-2">
                        <Text className="text-xs font-bold">Tanggal</Text>
                        <Text className="text-xs font-bold">Keterangan</Text>
                        <Text className="text-xs font-bold">Nominal</Text>
                    </View>

                )}

                <View className='h-64'>
                    <FlatList
                        data={resultAsset}
                        keyExtractor={(item, index) => item.id || index.toString()}
                        renderItem={({ item }) => (
                            <View className="flex flex-row justify-between px-2 py-1 border-b border-gray-100">
                                <Text className="text-xs text-gray-700 w-1/3">{activeForm === 'asset' ? item.kategori : item.tanggal}</Text>
                                <Text className="text-xs text-gray-700 w-1/3 text-center">{item.keterangan}</Text>
                                <Text className="text-xs text-gray-700 w-1/3 text-right">
                                    {item.nominal.toLocaleString('id-ID')}
                                </Text>
                            </View>
                        )}
                        ListEmptyComponent={<Text className="text-gray-500 text-center">Belum ada transaksi</Text>}
                    />
                </View>
            </View>

            {activeForm === 'asset' ? (
                <CreateAssetsForm 
                    type='asset'
                    title='Tambahkan Aset Usaha'
                    label1='Keterangan'
                    label2='Nominal'
                    label3='Kategori'
                />
            ) : (
                <CreateAssetsForm 
                    type='debt'
                    title='Tambahkan Hutang Usaha'
                    label1='Tanggal'
                    label2='Nominal'
                    label3='Keterangan'
                />
            )}
        </View>
    </KeyboardAwareScrollView>
    );
}