import { View } from 'react-native'
import React from 'react'
import { useFooter } from '@/utils/context/FooterContext';

export default function Footer() {
    const { showFooter, footerContent } = useFooter();

  if (!showFooter) return null;
  return (
    <View className='absolute bottom-0 left-0 right-0 bg-primary h-48 rounded-t-2xl z-10'>
      {footerContent}
    </View>
  )
}