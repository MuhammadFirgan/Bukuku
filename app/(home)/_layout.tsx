
import { Redirect, Slot } from 'expo-router'
import { auth$ } from '@/utils/states/authState'

export default function _layout() {

    if(!auth$.session.get()) return <Redirect href="/login" />
  return (
    <Slot />
  )
}