import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { Slot } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const koinImage= require('../../assets/images/koin.png')

export default function _layout() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={20} 
      enableOnAndroid={true} 
    >
      <View className="flex justify-center items-center">
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
      </View>
    </KeyboardAwareScrollView>
  )
}
