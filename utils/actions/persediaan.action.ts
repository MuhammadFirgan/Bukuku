import { PersediaanForm } from "@/types";
import { generateId } from "../SupaLegend";
import { persediaan$ } from "../states/PesediaanState";


export async function createBarang({nama_barang, harga_beli, harga_jual, keuntungan,  quantity}: PersediaanForm) {
    try {
        const id = generateId();
        persediaan$[id].assign({
            id,
            nama_barang,
            harga_jual,
            harga_beli,
            keuntungan: harga_jual - harga_beli,
            quantity,
            reset_date: 1,
        });

    } catch (error) {
        console.error('Error creating barang:', error);
        throw error;
    }

}

export function readBarang() {
    try {
        const dataBarang = persediaan$.get()
        return JSON.parse(JSON.stringify(dataBarang))
    } catch (error) {
        console.error('Error creating barang:', error);
        throw error;
    }
}