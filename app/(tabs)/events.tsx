import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { FlatList, View, Text, Image, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { API_BASE_URL } from '../../constants/api';
import { globalStyles as styles } from '../../styles/globalStyles'; // Global stilleri kullanıyoruz

export default function EventsScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/events`);
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Etkinlikler çekilemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <Pressable
      style={styles.card}
      onPress={() => router.push({ pathname: '/eventDetail', params: { id: item._id, title: item.title, description: item.description, image: item.image, date: item.date } })}
    >
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.cardInfo}>
        <Text style={styles.subtitle}>{item.title}</Text>
        <Text style={styles.text}>{new Date(item.date).toLocaleDateString('tr-TR')}</Text>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}> 
        <ActivityIndicator size="large" color="#4b7bec" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
}