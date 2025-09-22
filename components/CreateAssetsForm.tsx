import { View, Text, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import CustomButton from './CustomButton'
import { useState } from 'react';
import Calendar from 'react-native-calendars/src/calendar';

interface assetFormProps {
  type: 'asset' | 'debt';
  title: string
  label1: string
  label2: string
  label3: string
}


export default function CreateAssetsForm({type, title, label1, label2, label3}: assetFormProps) {
  const [showCalendar, setShowCalendar] = useState(false);
      const [selectedDate, setSelectedDate] = useState('');
  return (
    <View className='bg-white p-4 mx-4 rounded-xl'>
      <Text className='text-center text-gray-700 font-semibold'>{title}</Text>
      <View>
        <View className='flex flex-row items-center gap-5 mt-4'>
            <Text className='w-1/4'>{label1}</Text>
            {type === 'debt' ? (
              <>
                <TouchableOpacity 
                    className='border border-gray-400 w-1/2 text-xs rounded-xl px-2 py-1'
                    onPress={() => setShowCalendar(true)}
                >
                    <Text>{selectedDate || 'Pilih tanggal'}</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showCalendar}
                    onRequestClose={() => setShowCalendar(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
                        <View className='flex-1 justify-center items-center bg-black/50'>
                            <TouchableWithoutFeedback>
                                <View className='bg-white rounded-xl p-4'>
                                    <Calendar
                                        onDayPress={day => {
                                            setSelectedDate(day.dateString);
                                            setShowCalendar(false); // Sembunyikan modal setelah memilih tanggal
                                        }}
                                        theme={{
                                            todayTextColor: 'green',
                                            arrowColor: 'orange',
                                        }}
                                    />
                                    <TouchableOpacity 
                                        className="mt-4 p-2 bg-gray-200 rounded-lg"
                                        onPress={() => setShowCalendar(false)}
                                    >
                                        <Text className="text-center">Tutup</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
              </>
              
            ) : (
              <TextInput 
                  className='border border-gray-400 w-1/2 text-xs rounded-xl px-2 py-1'
              />
            )}
        </View>
        <View className='flex flex-row items-center gap-5 mt-4'>
            <Text className='w-1/4'>{label2}</Text>
            <TextInput 
                className='border border-gray-400 w-1/2 text-xs rounded-xl px-2 py-1'
            />
        </View>
        <View className='flex flex-row items-center gap-5 mt-4'>
            <Text className='w-1/4'>{label3}</Text>
            <TextInput 
                className='border border-gray-400 w-1/2 text-xs rounded-xl px-2 py-1'
            />
        </View>
        <CustomButton 
            text='Simpan' 
            className='bg-primary text-center px-4 py-2 rounded-lg mx-5 mt-7' 
            onPress={() => {}}
        />
      </View>
    </View>
  )
}