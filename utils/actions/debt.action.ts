import { CreateAssetForm } from "@/types";
import { generateId } from "../SupaLegend";
import { debt$ } from "../states/hutangState";

export function createdDebt(data: CreateAssetForm) {
    try {
        const assetId = generateId()
        const now = new Date().toISOString();

        debt$.assign({
            [assetId]: {
                id: assetId,
                keterangan: data.keterangan,
                tanggal: data.tanggal,
                nominal: data.nominal,
                created_at: now,
                updated_at: now,
            },
        })

        const newDebt = {
            id: assetId,
            keterangan: data.keterangan,
            tanggal: data.tanggal,
            nominal: data.nominal,
            created_at: now,
            updated_at: now,
        }

        return newDebt
    } catch (error) {
        console.error(error)
    }
}

export function readDebt() {
    try {
        const fetchingDataDebt = debt$.get();
        if (fetchingDataDebt && typeof fetchingDataDebt === 'object') {
            const processedData = Object.values(fetchingDataDebt)
                .map(item => ({
                    id: item.id,
                    keterangan: item.keterangan,
                    tanggal: item.tanggal,
                    nominal: item.nominal,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                }))
                // Tambahkan filter di sini
                .filter(item =>
                    item.keterangan !== undefined &&
                    item.tanggal !== undefined &&
                    item.nominal !== undefined
                );
            return processedData;
        }
        return [];
    } catch (error) {
        console.error("Error reading debt data:", error);
        return [];
    }
}