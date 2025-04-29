import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Animated, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '../../constants/api';
import { globalStyles as styles } from "../../styles/globalStyles";

export default function HomeScreen() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const name = await AsyncStorage.getItem("username");
      if (name) {
        setUsername(name);
      }
    };

    fetchUsername();
    const fetchUpcomingEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/upcoming`);
        const data = await res.json();
        setUpcomingEvents(data);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error('Yaklaşan etkinlikler çekilemedi:', error);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={[styles.centerContainer, { marginBottom: 20 }]}>
          <Text style={styles.title}>Hoş geldin, {username || "Kullanıcı"} 👋</Text>
          <Text style={styles.text}>Yeni etkinlikleri keşfetmeye hazır mısın?</Text>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Pressable style={styles.button} onPress={() => router.push('/(tabs)/events')}>
              <Text style={styles.buttonText}>Etkinliklere Git</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Yaklaşan Etkinlikler</Text>

          {upcomingEvents.length === 0 ? (
            <Text style={styles.text}>Şu anda yaklaşan etkinlik yok.</Text>
          ) : (
            upcomingEvents.map((event: any) => (
              <View key={event._id} style={styles.card}>
                {event.image && (
                  <Image
                    source={{ uri: event.image }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.cardInfo}>
                  <Text style={styles.subtitle}>{event.title}</Text>
                  <Text style={styles.text}>{event.description}</Text>
                  {event.date && (
                    <Text style={styles.text}>
                      📅 {new Date(event.date).toLocaleDateString('tr-TR')}
                    </Text>
                  )}
                </View>
              </View>
            ))
          )}
        </View>
        <View style={{ marginTop: 40 }}>
          <Pressable
            style={[styles.button, { backgroundColor: '#ef4444' }]}
            onPress={async () => {
              try {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('username');
                await AsyncStorage.clear();
                router.replace('/login');
              } catch (error) {
                console.error('Çıkış işlemi başarısız:', error);
              }
            }}
          >
            <Text style={styles.buttonText}>Çıkış Yap</Text>
          </Pressable>
        </View>
      </Animated.View>
    </ScrollView>
  );
}