import { observable } from "@legendapp/state";
import { customSynced, supabase } from "../SupaLegend";


export const funds$ = observable(
    customSynced({
        supabase,
        collection: 'operational_funds',
        select: (from) => from.select('id,total,created_at'),
        actions: ['read', 'create', 'update', 'delete'],
        realtime: true,
        persist: {
            name: 'operational_funds',
            retrySync: true
        },
        retry: {
            infinite: true
        },
        
    })
)

export const items$ = observable(
    customSynced({
        supabase,
        collection: 'operational_items',
        select: (from) => from.select('id,fund_id,name,price,created_at'),
        actions: ['read', 'create', 'update', 'delete'],
        realtime: true,
        persist: {
            name: 'operational_items',
            retrySync: true
        },
        retry: {
            infinite: true
        },
    })
)