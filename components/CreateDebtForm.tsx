import { View, Text, TextInput, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react'; // Import useState
import CustomButton from './CustomButton';
import Calendar from './../node_modules/react-native-calendars/src/calendar/index'; // Pastikan path ini benar

export default function CreateAssetsForm() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    return (
        <View className='bg-white p-4 mx-4 rounded-xl'>
            <Text className='text-center text-gray-700 font-semibold'>Tambahkan Hutang Usaha</Text>
            <View>
                <View className='flex flex-row items-center gap-5 mt-4'>
                    <Text className='w-1/4'>Tanggal</Text>
                    {/* Mengganti TextInput dengan TouchableOpacity untuk memicu modal */}
                    <TouchableOpacity 
                        className='border border-gray-400 w-1/2 text-xs rounded-xl px-2 py-1'
                        onPress={() => setShowCalendar(true)}
                    >
                        <Text>{selectedDate || 'Pilih tanggal'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Modal untuk menampilkan kalender */}
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

                {/* Form lainnya */}
                <View className='flex flex-row items-center gap-5 mt-4'>
                    <Text className='w-1/4'>Nominal</Text>
                    <TextInput 
                        className='border border-gray-400 w-1/2 text-xs rounded-xl px-2 py-1'
                    />
                </View>
                <View className='flex flex-row items-center gap-5 mt-4'>
                    <Text className='w-1/4'>Keterangan</Text>
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
    );
}