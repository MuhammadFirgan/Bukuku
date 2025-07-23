
import { stockEvents } from "../event/stock.event";
import { persediaan$ } from "../states/PesediaanState";
import { stock$ } from "../states/stockState";
import { generateId } from "../SupaLegend";

export async function updateStockWithLog(id: string, newQuantity: number) {
    const item = persediaan$.get()[id];
    if (!item) return null;
    const idItem = generateId()


    const prevQuantity = item.quantity || 0;
    const difference = newQuantity - prevQuantity;

  

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

    stockEvents.emit();
}

export function readStock() {
    try {
        
        const dataStock = stock$.get()

        return dataStock
    } catch (error) {
        console.error(error)
    }
}



