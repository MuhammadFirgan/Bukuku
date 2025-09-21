import { Dimensions, Image, Text, View } from 'react-native'
import { Slot } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const koinImage= require('../../assets/images/koin.png')

const layout = () => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={20} 
      enableOnAndroid={true} 
    >
      <View className="flex justify-center items-center relative">
        <View
          className="w-full relative bg-secondary flex justify-center gap-5"
          style={{ height: Dimensions.get('screen').height / 2.25 }}
        >
          <Image
            source={require('../../assets/images/logo.png')}
            className="w-56 h-20 absolute top-1/2 right-1/2 translate-x-1/2"
          />
          <Image
            source={koinImage}
            className="w-36 h-72 absolute top-14 left-0"
          />
        </View>
        <Slot />
        <View className='flex flex-row items-center gap-2'>
          <Image 
            source={require('../../assets/images/antarctic.png')}
            className="w-24 h-24 "
            resizeMode="contain"
          />
          <View>
            <Text>Powered By</Text>
            <Text className='text-2xl font-semibold'>Antarctic.px</Text>
          </View>
        </View>
        <Text className='text-xs text-gray-500'>Copyright 2025 - Antarctic.px</Text>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default layout
