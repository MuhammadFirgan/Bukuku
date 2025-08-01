import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const PengeluaranChart = () => {
  const data = [
    {
        name: 'Operasional',
        population: 200000,
        color: "#3b82f6",
        legendFontColor: "#3b82f6",
        legendFontSize: 15
    },
    {
        name: 'Pembelian',
        population: 200000,
        color: "#ef4444",
        legendFontColor: "#ef4444",
        legendFontSize: 15
    }
  ]

  return (
    <View className="pt-10">
      <Text className="text-center font-bold">TOTAL PENGELUARAN</Text>
      <PieChart
        data={data}
        width={screenWidth - 50}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor={"transparent"}
        paddingLeft={"0"}
   
      />
      {/* <View className="flex-row justify-around mt-2">
        <Text className="text-blue-600">Operasional (40.95%)</Text>
        <Text className="text-red-500">Pembelian (59.05%)</Text>
      </View> */}
    </View>
  );
};

export default PengeluaranChart;