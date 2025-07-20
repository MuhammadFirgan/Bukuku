import { Redirect, Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import './global.css'
import { useEffect } from "react";
import { supabase } from "@/utils/SupaLegend";
import { auth$ } from "@/utils/states/authState";
import 'react-native-get-random-values';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'poppins-md': require('../assets/fonts/Poppins-Regular-400.ttf'),
    'poppins-sb': require('../assets/fonts/Poppins-SemiBold-600.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }

    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data?.session) {
        auth$.session.set(data.session)
      } 

      if(!auth$.session.get()) return <Redirect href="/login" />
    }

    getSession()
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return <Stack 
    screenOptions={{
      headerShown: false
      
    }}/>;
}
