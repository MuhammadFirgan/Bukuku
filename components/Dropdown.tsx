import React, { useState } from 'react'
import { View, Text, Pressable, FlatList, Modal, TouchableWithoutFeedback } from 'react-native'

interface DropdownProps {
  label?: string
  options: string[]
  onSelect: (value: string) => void
  selected?: string
  dropdownWidth?: string
  optionalBgColor?: string
}

export default function Dropdown({ label, options, onSelect, selected, dropdownWidth, optionalBgColor }: DropdownProps) {
  const [open, setOpen] = useState(false)

  return (
    <View className={`relative ${dropdownWidth ? dropdownWidth : 'w-full'}`}>
      {label && <Text className="mb-1 text-sm text-gray-600">{label}</Text>}

      <Pressable
        onPress={() => setOpen(true)}
        className={`border border-white p-3 rounded-lg ${optionalBgColor ? optionalBgColor : 'bg-primary'}`}
      >
        <Text className="text-white font-semibold text-center">{selected || 'Pilih salah satu'}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View className="flex-1 justify-center items-center bg-black/30 px-6">
            <View className="bg-white rounded-xl w-full max-h-64 p-4">
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    className="p-3 border-b border-gray-100"
                    onPress={() => {
                      onSelect(item)
                      setOpen(false)
                    }}
                  >
                    <Text className="text-gray-700">{item}</Text>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}
