
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { FooterProvider } from '@/utils/context/FooterContext'
import { HeaderTitleProvider } from '@/utils/context/HeaderContext'
import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function layout() {
  return (
    <HeaderTitleProvider>
      <FooterProvider>
        <SafeAreaView className='h-full'>
          <Header />
          <Slot />
          <Footer />
        </SafeAreaView>
      </FooterProvider>
    </HeaderTitleProvider>
  )
}