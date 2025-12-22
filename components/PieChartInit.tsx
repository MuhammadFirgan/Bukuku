import { View, Text} from 'react-native';
import { PieChart } from 'react-native-chart-kit';



interface PieChartData {
    name: string
    population: number
    color: string
    legendFontColor: string
    legendFontSize: number
}

interface chartProps {
  title?: string
  data: PieChartData[]
  width: number
  height: number
}

const PieChartInit = ({ title, data, width, height }: chartProps) => {
    

  return (
    <View>
      <Text className="text-center font-bold">{title}</Text>
      <PieChart
        data={data}
        width={width}
        height={height}
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
    </View>
  );
};

export default PieChartInit;