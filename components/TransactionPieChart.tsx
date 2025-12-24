import { View, Text, Dimensions } from 'react-native'
import PieChartInit from './PieChartInit'

interface TransactionChartProps {
    totalPendapatan: number
    totalPengeluaran: number
}

const screenWidth = Dimensions.get('window').width;

export default function TransactionPieChart({totalPendapatan, totalPengeluaran}: TransactionChartProps) {
    const transactionData = [
    {
        name: 'Penjualan',
        population: totalPendapatan > 0 ? totalPendapatan : 1,
        color: "#ffdf20",
        legendFontColor: "#ffdf20",
        legendFontSize: 15
    },
    {
        name: 'Pembelian',
        population: totalPengeluaran > 0 ? totalPengeluaran : 1,
        color: "#ef4444",
        legendFontColor: "#ef4444",
        legendFontSize: 15
    }
  ]
  return (
    <PieChartInit 
      data={transactionData}
      width={screenWidth - 20}
      height={170}
    />
  )
}