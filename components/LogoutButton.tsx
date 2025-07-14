import { logout } from '@/utils/actions/auth.action';
import { router } from 'expo-router';
import { TouchableOpacity, Image, Alert } from 'react-native'


export default function LogoutButton() {
    const handleLogout = async () => {
        Alert.alert(
            "Konfirmasi Logout",
            "Apakah kamu yakin ingin logout?",
            [
              {
                text: "Tidak",
                style: "cancel",
              },
              {
                text: "Ya",
                onPress: async () => {
                  try {
                    await logout();
                    router.push('/login')
                  } catch (err: any) {
                    Alert.alert("Logout Gagal", err.message);
                  }
                },
                style: "destructive",
              },
            ],
            { cancelable: true }
          );
    }
  return (
    <TouchableOpacity onPress={handleLogout}>
        <Image 
            source={require('../assets/images/logout.png')}
            className='size-10'
        />
    </TouchableOpacity>
  )
}