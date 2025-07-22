import React, { useState } from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'

interface DropdownProps {
  label?: string
  options: string[]
  onSelect: (value: string) => void
  selected?: string
}

export default function Dropdown({ label, options, onSelect, selected }: DropdownProps) {
  const [open, setOpen] = useState(false)

  return (
    <View className="relative w-full">
      {label && <Text className="mb-1 text-sm text-gray-600">{label}</Text>}

      <Pressable
        onPress={() => setOpen(!open)}
        className="border border-white p-3 rounded-lg bg-primary"
      >
        <Text className="text-white font-semibold text-center">{selected || 'Pilih salah satu'}</Text>
      </Pressable>

      {open && (
        <View className="absolute w-full bg-white border border-gray-200 mt-1 rounded-lg z-[999999999] max-h-40">
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            nestedScrollEnabled
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
      )}
    </View>
  )
}
