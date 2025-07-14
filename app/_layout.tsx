import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import './global.css'
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'poppins-md': require('../assets/fonts/Poppins-Regular-400.ttf'),
    'poppins-sb': require('../assets/fonts/Poppins-SemiBold-600.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Stack 
    screenOptions={{
      headerShown: false
    }}/>;
}
