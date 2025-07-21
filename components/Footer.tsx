import { View, Text } from 'react-native'
import React from 'react'
import { useFooter } from '@/utils/context/FooterContext';

export default function Footer() {
    const { showFooter, footerContent } = useFooter();

  if (!showFooter) return null;
  return (
    <View>
      {footerContent}
    </View>
  )
}