import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminHome() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('/login');
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Admin Paneline Hoş Geldin 👑</Text>
      <Text style={globalStyles.subtitle}>
        Buradan etkinlikleri yönetebilir, yeni etkinlikler ekleyebilirsin.
      </Text>
      <Pressable onPress={handleLogout} style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Çıkış Yap</Text>
      </Pressable>
    </ScrollView>
  );
}
