import { FlatList, View, Text, StyleSheet, Image, Pressable } from 'react-native';

const events = [
  {
    id: '1',
    title: 'React Native Workshop',
    date: '2025-05-01',
    location: 'Online',
    image: 'https://reactnative.dev/img/header_logo.svg',
  },
  {
    id: '2',
    title: 'Tech Meetup Ankara',
    date: '2025-05-10',
    location: 'Ankara, Türkiye',
    image: 'https://picsum.photos/300/200',
  },
  {
    id: '3',
    title: 'Startup Talk',
    date: '2025-06-01',
    location: 'İstanbul, Türkiye',
    image: 'https://picsum.photos/300/201',
  },
];

export default function EventsScreen() {
  const renderItem = ({ item }: { item: typeof events[0] }) => (
    <Pressable style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>{item.date} | {item.location}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
