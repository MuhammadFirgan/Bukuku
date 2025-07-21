
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { HeaderTitleProvider } from '@/utils/context/HeaderContext'
import { Slot } from 'expo-router'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function layout() {
  return (
    <HeaderTitleProvider>
      <SafeAreaView>
        <Header />

        <Slot />
        <Footer />
      </SafeAreaView>
    </HeaderTitleProvider>
  )
}