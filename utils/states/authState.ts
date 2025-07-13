import { observable } from "@legendapp/state";
// import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
// import { persistObservable } from '@legendapp/state/persist'
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const auth$ = observable({
    session: null as any, // Supabase Session
  })
  
  // Persist session (optional, for automatic login)
//   persistObservable(auth$, {
//     plugin: observablePersistAsyncStorage({ AsyncStorage }),
//     name: 'auth',
//   })