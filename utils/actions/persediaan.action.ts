import { PersediaanForm } from "@/types";
import { generateId } from "../SupaLegend";
import { persediaan$ } from "../states/PesediaanState";


export async function createBarang({nama_barang, harga_beli, harga_jual, keuntungan,  quantity}: PersediaanForm) {
    try {
        const id = generateId();

        //@ts-ignore
        persediaan$[id].assign({
            [id]: {
                id,
                nama_barang,
                harga_jual,
                harga_beli,
                keuntungan: harga_jual - harga_beli,
                quantity,
                reset_date: 1,
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
        
        const dataBarang = Object.entries(fetchingDataBarang).map(([id, item]) => ({
            id,
            ...item
        }))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); 

        return dataBarang;
    } catch (error) {
        console.error('Error creating barang:', error);
        throw error;
    }
}

export function updateStock(
    newStock: number,
    id: any
) {
    try {
        if (persediaan$[id]?.quantity) {
            persediaan$[id].quantity.set(newStock)
        }
    } catch (error) {
        console.error(error)
    }
}