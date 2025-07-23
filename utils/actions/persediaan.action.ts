import { PersediaanForm } from "@/types";
import { generateId } from "../SupaLegend";
import { persediaan$ } from "../states/PesediaanState";
import { stockEvents } from "../event/stock.event";


export async function createBarang({
    nama_barang,
    harga_beli,
    harga_jual,
    keuntungan,
    quantity
  }: PersediaanForm) {
    try {
      const id = generateId();
  
      persediaan$.assign({
        [id]: {
          id,
          nama_barang,
          harga_jual: Number(harga_jual),
          harga_beli: Number(harga_beli),
          keuntungan: Number(harga_jual) - Number(harga_beli),
          quantity: Number(quantity),
          reset_date: 1,
          created_at: new Date().toISOString()
        }
      });
  
    } catch (error) {
      console.error('Error creating barang:', error);
      throw error;
    }
  }
  

  export async function readBarang() {
    try {
      const fetchingDataBarang = persediaan$.get() || {}
  
      const dataBarang = Object.entries(fetchingDataBarang)
        .filter(([_, item]: any) => item && item.nama_barang && item.harga_beli && item.harga_jual)
        .map(([id, item]: any) => ({
          id,
          ...item,
          harga_beli: Number(item.harga_beli),
          harga_jual: Number(item.harga_jual),
          quantity: Number(item.quantity)
        }))
        .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

      return dataBarang;
  
    } catch (error) {
      console.error('❌ Error creating barang:', error);
      throw error;
    }
  }
  



export function updateBarangQuantity(barang_id: string, amount: number, type: 'in' | 'out') {
  const current = persediaan$.get()?.[barang_id]

  if (!current) return

  const updatedQty = type === 'in'
    ? current.quantity + amount
    : current.quantity - amount

  persediaan$.assign({
    [barang_id]: {
      ...current,
      quantity: updatedQty,
    }

    
  })

  stockEvents.emit() // agar komponen refresh
}
