import { View, Text, Pressable } from 'react-native'
import { useState } from 'react'
import ModalLayout from './ModalLayout'
import { ModalTrigger } from '@/types'
import EditStockForm from './EditStockForm'
import EditPriceForm from './EditPriceForm'



export default function EditFormLayout({ visible, onClose, id }: ModalTrigger) {
  const [mode, setMode] = useState<'stock' | 'harga'>('stock')
  
  return (
    <ModalLayout
      headerTitle='Tambah Stock'
      visible={visible}
      onClose={onClose}
    >
      <View>
        {/* Toggle Buttons */}
        <View className='flex flex-row justify-center gap-4 -mt-5'>
          <Pressable 
            className={`bg-white p-3 rounded-lg shadow-2xl ${mode === 'stock' ? 'border-2 border-primary' : ''}`}
            onPress={() => setMode('stock')}
          >
            <Text className='text-primary'>Tambah Stock</Text>
          </Pressable>
          <Pressable 
            className={`bg-white p-3 rounded-lg shadow-2xl ${mode === 'harga' ? 'border-2 border-primary' : ''}`}
            onPress={() => setMode('harga')}
          >
            <Text className='text-primary'>Edit Harga</Text>
          </Pressable>
       
        </View>

        {/* Form Content */}
        <View className='flex flex-row justify-center gap-4 px-4 mt-8'>
          <View className="flex flex-col gap-4">
            {mode === 'stock' && 
            <EditStockForm 
              id={id}/>
              

            }
            {mode === 'harga' && 
              <EditPriceForm
              id={id}
            />
            }
          </View>

        </View>
      </View>
    </ModalLayout>
  )
}
