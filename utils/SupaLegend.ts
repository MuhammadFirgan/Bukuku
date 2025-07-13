import { createClient } from '@supabase/supabase-js'
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase'
import { configureSynced } from '@legendapp/state/sync'
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid'


export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
)

const generateId = () => uuidv4()

export const customSynced = configureSynced(syncedSupabase, {

    persist: {
      plugin: observablePersistAsyncStorage({
        AsyncStorage,
      }),
    },
    generateId,
    supabase,
    changesSince: 'last-sync',
    fieldCreatedAt: 'created_at',
    fieldUpdatedAt: 'updated_at',
    // Optionally enable soft deletes
    fieldDeleted: 'deleted',
})