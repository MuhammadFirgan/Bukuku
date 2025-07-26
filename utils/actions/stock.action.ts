
import { stockEvents } from "../event/stock.event";
import { persediaan$ } from "../states/PesediaanState";
import { stock$ } from "../states/stockState";
import { generateId } from "../SupaLegend";


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

    persediaan$.assign({
      [id]: {
        ...item,
        quantity: newQuantity,
      },
    });

    stockEvents.emit();
  }

export function readStock() {
  try {
    const fetchingDataStock = stock$.get() || {};
    const dataStock = {
      items: Object.entries(fetchingDataStock)
        .map(([id, item]: any) => ({
          id,
          ...item,
          amount: Number(item.amount),
        }))
        .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()),
    };

    console.log('Data stok dari stock_log:', dataStock.items.length, dataStock.items); // Log untuk debugging
    return dataStock;
  } catch (error) {
    console.error('❌ Error reading stock:', error);
    throw error;
  }
}



