
import { stockEvents } from "../event/stock.event";
import { persediaan$ } from "../states/PesediaanState";
import { stock$ } from "../states/stockState";
import { generateId } from "../SupaLegend";
import { updateBarangQuantity } from "./persediaan.action";

export async function updateStockWithLog(id: string, newQuantity: number) {
    const item = persediaan$.get()[id];
    if (!item) return null;
  
    const prevQuantity = item.quantity || 0;
    const difference = newQuantity - prevQuantity;
  
    if (difference === 0) return;
  
    const idItem = generateId();
  
    // Log perubahan stok
    // @ts-ignore
    stock$[idItem].assign({
      id: idItem,
      user_id: item.user_id,
      barang_id: id,
      type: difference > 0 ? "in" : "out",
      amount: Math.abs(difference),
      created_at: new Date().toISOString(),
    });
  
    // Perbarui quantity barang
    persediaan$.assign({
      [id]: {
        ...item,
        quantity: newQuantity,
      },
    });
  
    // Emit event hanya sekali
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



