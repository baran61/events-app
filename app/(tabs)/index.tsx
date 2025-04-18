import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { globalStyles as styles } from '../styles/globalStyles';

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUsername = async () => {
      const name = await AsyncStorage.getItem('username');
      if (name) setUsername(name);
    };

    fetchUsername();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoş geldin, {username || 'Kullanıcı'} 👋</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Yaklaşan Etkinlikler</Text>
        <Text style={styles.text}>• React Native Workshop - 1 Mayıs</Text>
        <Text style={styles.text}>• Startup Talk - 6 Haziran</Text>
      </View>

      <View style={styles.section}>
        <Button title="Etkinliklere Git" onPress={() => router.push('/(tabs)/events')} />
        <View style={{ marginTop: 12 }} />
        <Button
          title="Çıkış Yap"
          color="red"
          onPress={async () => {
            await AsyncStorage.clear();
            router.replace('/login');
          }}
        />
      </View>
    </View>
  );
}
