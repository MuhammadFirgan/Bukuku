import { View, Text, Dimensions } from 'react-native'
import PieChartInit from './PieChartInit'

interface TransactionChartProps {
    totalPendapatan: number
    totalPengeluaran: number
}

const screenWidth = Dimensions.get('window').width;

export default function BebanUsahaChart({totalPendapatan, totalPengeluaran}: TransactionChartProps) {
    const transactionData = [
    {
        name: 'Keuntungan',
        population: totalPendapatan > 0 ? totalPengeluaran : 1,
        color: "#00c951",
        legendFontColor: "#00c951",
        legendFontSize: 13
    },
    {
        name: 'Beban Usaha',
        population: totalPengeluaran > 0 ? totalPengeluaran : 1,
        color: "#ef4444",
        legendFontColor: "#ef4444",
        legendFontSize: 13
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