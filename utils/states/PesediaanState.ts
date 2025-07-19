import { observable } from "@legendapp/state";
import { customSynced, supabase } from "../SupaLegend";


export const persediaan$ = observable(
    customSynced({
        supabase,
        collection: 'persediaan',
        select: (from) => from.select('id,nama_barang,harga_beli,harga_jual,keuntungan,reset_date,quantity,created_at,updated_at'),
        actions: ['read', 'create', 'update', 'delete'],
        realtime: true,
        persist: {
            name: 'persediaan',
            retrySync: true
        },
        retry: {
            infinite: true
        }
    })
)