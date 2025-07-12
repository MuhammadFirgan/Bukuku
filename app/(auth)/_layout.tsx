import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { Slot } from 'expo-router'

const koinImage= require('../../assets/images/koin.png')

export default function _layout() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1 bg-gray-200'>
        <ScrollView keyboardShouldPersistTaps="handled">
            <View className='flex justify-center items-center'>
                <View className="w-full relative bg-secondary flex justify-center gap-5" style={{ height: Dimensions.get('screen').height / 2.25}}>
                    <Image source={require('../../assets/images/logo.png')} className='w-56 h-20 absolute top-1/2 right-1/2 translate-x-1/2'/>
                    <Image source={koinImage} className='w-36 h-72 absolute top-14 left-0'  />
                </View>
                <Slot />
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}
