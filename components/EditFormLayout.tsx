import { View, Text } from 'react-native'
import React from 'react'
import ModalLayout from './ModalLayout'
import { ModalTrigger } from '@/types'

export default function EditFormLayout({ visible, onClose }: ModalTrigger) {
  return (
    <ModalLayout
        headerTitle='Tambah Stock'
        visible={visible}
        onClose={onClose}

    >
        <View>
            <Text>Halo</Text>
        </View>

    </ModalLayout>
  )
}