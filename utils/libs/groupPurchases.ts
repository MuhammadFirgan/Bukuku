// @/utils/libs/groupPurchases.ts

import { Barang, StockLog } from '@/types'

type MergedStockLog = StockLog & {
  harga_total: number
}

export function mergeStockLogsByDay(
  logs: StockLog[],
  barangList: Barang[]
): MergedStockLog[] {
  const mergedMap: Record<string, MergedStockLog> = {}

  logs.forEach((log) => {
    if (!log.created_at || log.type !== 'in') return

    const date = new Date(log.created_at)
    const dateKey = date.toISOString().split('T')[0]
    const key = `${dateKey}_${log.barang_id}`
    const amount = log.amount ?? 0

    const barang = barangList.find((b) => b.id === log.barang_id)
    const hargaSatuan = barang?.harga_beli ?? 0
    const hargaTotal = amount * hargaSatuan

    if (!mergedMap[key]) {
      mergedMap[key] = {
        ...log,
        amount,
        harga_total: hargaTotal,
      }
    } else {
      mergedMap[key].amount = (mergedMap[key].amount ?? 0) + amount
      mergedMap[key].harga_total += hargaTotal
    }
  })

  return Object.values(mergedMap)
}




export function groupByWeekFromDate(
  logs: MergedStockLog[], // ubah di sini
  barangList: Barang[],
  startDate: Date
) {
  const grouped: {
    jenis: string
    unit: string
    biaya: string | number
  }[][] = []

  for (let week = 0; week < 4; week++) {
    const days: {
      jenis: string
      unit: string
      biaya: string | number
    }[] = []

    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + week * 7 + day)

      const log = logs.find((l) => {
        if (!l.created_at) return false
        const logDate = new Date(l.created_at)
        return (
          logDate.getDate() === currentDate.getDate() &&
          logDate.getMonth() === currentDate.getMonth() &&
          logDate.getFullYear() === currentDate.getFullYear()
        )
      })

      if (log) {
        const barang = barangList.find((b) => b.id === log.barang_id)

        const jenis = barang?.nama_barang ?? '-'
        const unit = log.amount.toString()
        const biaya = log.harga_total ?? '-' // ✅ Gunakan hasil merge

        days.push({ jenis, unit, biaya })
      } else {
        days.push({ jenis: '-', unit: '-', biaya: '-' })
      }
    }

    grouped.push(days)
  }

  return grouped
}


