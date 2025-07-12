import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { View, Text, Image } from 'react-native'


export default function login() {
  return (
    <View className='bg-white w-[90%] p-5 -mt-5 rounded-xl relative'>
      {/* <View className=''>
        <Image source={require('../../assets/images/login.png')} className='size-32 absolute left-1/2 right-1/2 -translate-x-1/2 -translate-y-24 bg-secondary border rounded-full p-5 border-white' resizeMode='contain'/>
      </View> */}
      <View className='flex flex-1 justify-center items-center -translate-y-10'>
        <View className="size-32 absolute left-1/2 -translate-x-1/2 bg-secondary border-2 border-white rounded-full p-5">
          <Image
            source={require('../../assets/images/login.png')}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </View>
      
      <View className='mt-24 w-full flex flex-col justify-center items-center gap-5'>
        <CustomInput 
          label='Username'
          password={false}
        />
        <CustomInput 
          label='Password'
          password={true}
        />
        <View className='mt-3'>
          <CustomButton />
        </View>
      </View>
    </View>
  )
}
