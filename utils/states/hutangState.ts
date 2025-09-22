import { observable } from "@legendapp/state";
import { customSynced, supabase } from "../SupaLegend";


export const debt$ = observable(
    // @ts-ignore
    customSynced({
        supabase,
        collection: 'aset',
        select: (from) => from.select('id,tanggal,keterangan,nominal,created_at,updated_at'),
        actions: ['read', 'create', 'update', 'delete'],
        realtime: true,
        persist: {
            name: 'persediaan',
            retrySync: true
        },
        retry: {
            infinite: true
        },
    })
)