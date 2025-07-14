
import DashboardCard from "@/components/DashboardCard";
import { menuItems } from "@/constants";
import { FlatList, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
 
export default function Index() {
  return (
    <SafeAreaView className="bg-primary h-full">
        <View className="flex flex-1 justify-center items-center mb-14">
          <Image
            source={require('../../assets/images/logo.png')}
            className="w-56 h-20  absolute top-0 right-1/2 translate-x-1/2"
            resizeMode="contain"
          />
        </View>

        {/* Panggil session di index, biar dak bolak balik login  */}
        {/* tambahkan fitur logout */}
        {/* Ready Task 2 */}


        <FlatList 
          data={menuItems}
          keyExtractor={(item) => item.label}
          numColumns={2}
      
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <DashboardCard item={item} index={index} />
          )}
        />
     
    </SafeAreaView>
  );
}