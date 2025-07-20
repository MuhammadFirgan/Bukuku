import { persediaan$ } from "../states/PesediaanState";
import { stock$ } from "../states/stockState";
import { generateId, supabase } from "../SupaLegend";

export async function updateStockWithLog(id: string, newQuantity: number) {
    const item = persediaan$.get()[id];
    if (!item) return null;
    const idItem = generateId()


    const prevQuantity = item.quantity || 0;
    const difference = newQuantity - prevQuantity;

    // const userId = supabase.auth.getSession().data?.session?.user?.id

    if (difference === 0) return;

    persediaan$[id].quantity.set(newQuantity);


    // @ts-ignore
    stock$[idItem].assign({
        id: idItem,
        user_id:item.user_id,
        barang_id: id,
        type: difference > 0 ? 'in' : 'out',
        amount: Math.abs(difference),
      
    });
}
