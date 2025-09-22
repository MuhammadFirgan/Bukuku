import { observable } from "@legendapp/state";
import { customSynced, supabase } from "../SupaLegend";

export const history$ = observable(
  // @ts-ignore
    customSynced({
        supabase,
        collection: 'history_penjualan',
        select: (from) => from.select('id, barang_id, type, amount, harga_jual, subtotal, created_at'),
        actions: ['read', 'create'],
        realtime: true,
        persist: {
          name: 'history_penjualan',
          retrySync: true
        },
        retry: {
          infinite: true
        },
    })
)