import { View, Text } from 'react-native'
import { Redirect, Slot } from 'expo-router'

export default function _layout() {

    const isAuth = true

    if(!isAuth) return <Redirect href="/login" />
  return (
    <Slot />
  )
}