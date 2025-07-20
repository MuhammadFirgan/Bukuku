import { observable } from "@legendapp/state";
import { customSynced, supabase } from "../SupaLegend";

export const stock$ = observable(
  customSynced({
    supabase,
    collection: 'stock_log',
    select: (from) => from.select('id, barang_id, type, amount, created_at, updated_at'),
    actions: ['read', 'create', 'update', 'delete'],
    realtime: true,
    persist: {
      name: 'stock_log',
      retrySync: true
    },
    retry: {
      infinite: true
    },
  
  })
); 
