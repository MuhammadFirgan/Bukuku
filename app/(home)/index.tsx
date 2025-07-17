
import DashboardCard from "@/components/DashboardCard";
import LogoutButton from "@/components/LogoutButton";
import { menuItems } from "@/constants";
import { FlatList, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
 
export default function Index() {
  return (
    <SafeAreaView className="bg-primary h-full">
        <View className="relative justify-center items-center mb-14 h-20">        
          <View className="absolute left-0 pl-4">
            <LogoutButton />
          </View>
          <Image
            source={require('../../assets/images/logo.png')}
            className="w-56 h-20"
            resizeMode="contain"
          />
        </View>


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