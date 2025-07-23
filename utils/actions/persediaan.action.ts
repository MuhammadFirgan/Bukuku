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
        
      // @ts-ignore
      persediaan$[id].assign({
        id,
        nama_barang,
        harga_jual: Number(harga_jual),
        harga_beli: Number(harga_beli),
        keuntungan: Number(harga_jual) - Number(harga_beli),
        quantity: Number(quantity),
        reset_date: 1,
        created_at: new Date().toISOString()
        
      });

      stockEvents.emit();
  
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

  stockEvents.emit() 
}

export function readBarangById(id: string) {
    try {
        const barangById = persediaan$.get()?.[id]

        return barangById
    } catch (error) {
        console.error(error)
    }
}

export function editHargaBarang(barang_id: string, harga_beli: number, harga_jual: number) {
    try {
      const current = persediaan$.get()?.[barang_id];
  
      if (!current) {
        console.error('Barang tidak ditemukan:', barang_id);
        return;
      }
  
      persediaan$.assign({
        [barang_id]: {
          ...current,
          harga_beli,
          harga_jual,
          keuntungan: harga_jual - harga_beli,
        }
      });
  
      stockEvents.emit(); 
  
    } catch (error) {
      console.error('Gagal mengedit barang:', error);
      throw error;
    }
  }


  
