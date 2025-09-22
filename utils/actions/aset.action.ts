import { CreateAssetForm } from "@/types";
import { generateId } from "../SupaLegend";
import { aset$ } from './../states/asetState';

export function createAsset(data: CreateAssetForm) {
    try {
        const assetId = generateId()
        const now = new Date().toISOString();

        aset$.assign({
            [assetId]: {
                id: assetId,
                keterangan: data.keterangan,
                nominal: data.nominal,
                kategori: data.kategori,
                created_at: now,
                updated_at: now,
            },
        })

        const newAsset = {
            id: assetId,
            keterangan: data.keterangan,
            nominal: data.nominal,
            kategori: data.kategori,
            created_at: now,
            updated_at: now,
        }

        return newAsset

    } catch (error) {
        console.error(error)
    }
}

export function readAsset() {
    try {
        const fetchingDataAsset = aset$.get();
        if (fetchingDataAsset && typeof fetchingDataAsset === 'object') {
            const processedData = Object.values(fetchingDataAsset)
                .map(item => ({
                    keterangan: item.keterangan,
                    kategori: item.kategori,
                    nominal: item.nominal,
                }))
                // Tambahkan filter di sini
                .filter(item => 
                    item.keterangan !== undefined && 
                    item.kategori !== undefined && 
                    item.nominal !== undefined
                );
            return processedData;
        }
        return [];
    } catch (error) {
        console.error("Error reading asset data:", error);
        return [];
    }
}