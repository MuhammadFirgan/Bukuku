import { ModalLayoutProps } from '@/types'
import AntDesign from '@expo/vector-icons/AntDesign'
import { View, Text, TouchableOpacity, Modal, Pressable} from 'react-native'


export default function ModalLayout({ headerTitle, children, visible, onClose }: ModalLayoutProps) {
  return (
    <View >
        <Modal
            animationType="slide"
            transparent={true}
            // visible={modalVisible}
            visible={visible}
            // onRequestClose={() => setModalVisible(!modalVisible)}
            onRequestClose={onClose}
        >
            <Pressable
                className='flex-1 bg-black/40 justify-start items-center'
                onPress={onClose}
            >
                <Pressable 
                    className='w-full'
                    onPress={(e) => e.stopPropagation()}    
                >
                    <View className='bg-white h-96 rounded-2xl m-3'>
                        {/* header */}
                        <View className='bg-primary h-40 rounded-b-2xl shadow-md'>
                            <TouchableOpacity
                                className="absolute left-4 top-4"
                                onPress={onClose}
                            >
                                <AntDesign name="left" size={24} color="white" />
                            </TouchableOpacity>
                            <View className='flex justify-center items-center flex-1'>
                                <Text className='text-center text-3xl text-white font-semibold'>{headerTitle}</Text>
                            </View>
                        </View>
                        {children}
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
        
    </View>
  )
}