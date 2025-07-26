import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { login } from '@/utils/actions/auth.action'
import { auth$ } from '@/utils/states/authState'
import { router } from 'expo-router'
import { useState } from 'react'
import { View, Image, Alert } from 'react-native'


export default function Login() {
  const [ form, setForm ] = useState({
    'username': '',
    'password': ''
  })
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const dataLogin = await login(form.username, form.password)


      auth$.session.set(dataLogin.session)
      console.log("user id : ", auth$.session.get()?.user.id)
      router.push('/')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <View className='bg-white w-[90%] p-5 -mt-14 rounded-xl relative mb-14'>
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
          onChangeText={(text) => setForm((prev) => ({ ...prev, username: text }))}
          value={form.username}
        />


        <CustomInput 
          label='Password'
          password={true}
          onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
          value={form.password}
        />
        <View className='mt-3'>
          <CustomButton 
            text='Login'
            onPress={handleSubmit}
            loading={loading}
            disable={loading}
            className='w-72 flex justify-center items-center'
          />
        </View>
      </View>
    </View>
  )
}
