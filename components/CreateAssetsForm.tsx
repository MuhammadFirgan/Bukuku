import { View, Text, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import CustomButton from './CustomButton';
import { useState } from 'react';
import Calendar from 'react-native-calendars/src/calendar';
import { createAsset } from '@/utils/actions/aset.action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface assetFormProps {
  type: 'asset' | 'debt';
  title: string;
  label1: string;
  label2: string;
  label3: string;
}

export default function CreateAssetsForm({ type, title, label1, label2, label3 }: assetFormProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  
  // Use a different state for each input field
  const [description, setDescription] = useState('');
  const [nominal, setNominal] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (type === 'asset') {
      if (!description || !nominal) {
        Alert.alert('Error', 'Masukkan nama dan harga yang valid');
        return;
      }

      const resultAsset = createAsset({
        keterangan: description, 
        nominal: 
        parseFloat(nominal), 
        kategori: category
      })

      if(resultAsset) {
        setDescription('');
        setNominal('');
        setCategory('');
        Alert.alert('Sukses', 'Aset berhasil ditambahkan');
      }


    } else if (type === 'debt') {
      if (!selectedDate || !nominal || !description) {
        Alert.alert('Error', 'Mohon lengkapi semua data');
        return;
      }
    }

  };

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
                            setShowCalendar(false);
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
              value={description}
              onChangeText={setDescription}
            />
          )}
        </View>
        <View className='flex flex-row items-center gap-5 mt-4'>
          <Text className='w-1/4'>{label2}</Text>
          <TextInput
            className='border border-gray-400 w-1/2 text-xs rounded-xl px-2 py-1'
            keyboardType='numeric'
            value={nominal}
            onChangeText={setNominal}
          />
        </View>
        <View className='flex flex-row items-center gap-5 mt-4'>
          <Text className='w-1/4'>{label3}</Text>
          <TextInput
            className='border border-gray-400 w-1/2 text-xs rounded-xl px-2 py-1'
            value={category}
            onChangeText={setCategory}
          />
        </View>
        <CustomButton
          text='Simpan'
          className='bg-primary text-center px-4 py-2 rounded-lg mx-5 mt-7'
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}