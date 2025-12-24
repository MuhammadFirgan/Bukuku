import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import WrapText from './WrapText';
import { readBarang } from '@/utils/actions/persediaan.action';
import { readStock } from '@/utils/actions/stock.action';
import { readItems } from '@/utils/actions/operational.action';

export default function ArusKasMode() {
  const [kasMasuk, setKasMasuk] = useState<number>(0);
  const [kasKeluarBarang, setKasKeluarBarang] = useState<number>(0);
  const [kasKeluarOperasional, setKasKeluarOperasional] = useState<number>(0);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [barang, stockResult, operationalItems] = await Promise.all([
          readBarang(),
          readStock(),
          readItems()
        ]);

        const stockLogs = stockResult?.items ?? [];
        setItems(operationalItems);

        // Buat map barang untuk akses cepat
        const barangMap = new Map(barang.map(b => [b.id, b]));

        let totalKasMasuk = 0;
        let totalKasKeluarBarang = 0;

        // Proses setiap log stok
        stockLogs.forEach(log => {
          const b = barangMap.get(log.barang_id);
          if (!b) return;

          if (log.type === 'out') {
            // Kas MASUK: penjualan tunai
            totalKasMasuk += (log.amount || 0) * b.harga_jual;
          } else if (log.type === 'in') {
            // Kas KELUAR: pembelian stok
            totalKasKeluarBarang += (log.amount || 0) * b.harga_beli;
          }
        });

        // Kas keluar operasional
        const totalOperasional = operationalItems.reduce(
          (sum, item) => sum + (item.price || 0),
          0
        );

        setKasMasuk(totalKasMasuk);
        setKasKeluarBarang(totalKasKeluarBarang);
        setKasKeluarOperasional(totalOperasional);
      } catch (error) {
        console.error('❌ Gagal memuat data arus kas:', error);
      }
    };

    loadData();
  }, []);

  const totalKasKeluar = kasKeluarBarang + kasKeluarOperasional;
  const saldoKasBersih = kasMasuk - totalKasKeluar;

  return (
    <View>
      {/* === KAS MASUK === */}
      <Text className='font-semibold text-lg mt-4 uppercase'>Kas Masuk</Text>
      <WrapText label='Penjualan Tunai' value={kasMasuk} />
      <WrapText label='Total Kas Masuk' value={kasMasuk} isBold />

      {/* === KAS KELUAR === */}
      <Text className='font-semibold text-lg mt-4 uppercase'>Kas Keluar</Text>
      <WrapText label='Pembelian Persediaan' value={kasKeluarBarang} />
      {items.map(item => (
        <WrapText key={item.id} label={item.name} value={item.price} />
      ))}
      <WrapText 
        label='Total Beban Operasional' 
        value={kasKeluarOperasional} 
      />
      <WrapText 
        label='Total Kas Keluar' 
        value={totalKasKeluar} 
        isBold 
      />

      {/* === SALDO KAS === */}
      <Text className='font-semibold text-lg mt-4 uppercase'>Saldo Kas Bersih</Text>
      <WrapText 
        label='Kenaikan / Penurunan Kas' 
        value={saldoKasBersih} 
        isBold 
      />
    </View>
  );
}