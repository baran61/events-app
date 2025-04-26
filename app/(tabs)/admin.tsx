import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import { API_BASE_URL } from '../../constants/api'; // Düzgün import
import { globalStyles as styles } from '../styles/globalStyles';

export default function AdminScreen() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState(null); // Şu an düzenlenen etkinliğin ID'si
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  
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
    }
  };

  const addEvent = async () => {
    if (!newTitle || !newDescription) {
      Alert.alert('Eksik Bilgi', 'Başlık ve açıklama giriniz.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });

      if (!res.ok) throw new Error('Etkinlik eklenemedi');

      setNewTitle('');
      setNewDescription('');
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
      });
      fetchEvents();
    } catch (error) {
      console.error('Etkinlik silinemedi:', error);
    }
  };

  const updateEvent = async () => {
    if (!editTitle || !editDescription) {
      Alert.alert('Eksik Bilgi', 'Başlık ve açıklama giriniz.');
      return;
    }
    try {
      await fetch(`${API_BASE_URL}/events/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      });

      setEditingId(null);
      setEditTitle('');
      setEditDescription('');
      fetchEvents();
    } catch (error) {
      console.error('Etkinlik güncellenemedi:', error);
    }
  };

  const startEditing = (event: any) => {
    setEditingId(event._id);
    setEditTitle(event.title);
    setEditDescription(event.description);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Paneli</Text>

      <TextInput
        style={styles.input}
        placeholder="Yeni Etkinlik Başlığı"
        value={newTitle}
        onChangeText={setNewTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Yeni Etkinlik Açıklaması"
        value={newDescription}
        onChangeText={setNewDescription}
      />
      <Button title="➕ Etkinlik Ekle" onPress={addEvent} />

      <FlatList
        data={events}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 20, padding: 10, borderWidth: 1, borderRadius: 8 }}>
            <Text style={styles.subtitle}>{item.title}</Text>
            <Text>{item.description}</Text>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#4caf50',
                  padding: 8,
                  borderRadius: 5,
                  marginRight: 8,
                }}
                onPress={() => startEditing(item)}
              >
                <Text style={{ color: 'white' }}>📝 Düzenle</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#f44336',
                  padding: 8,
                  borderRadius: 5,
                }}
                onPress={() => deleteEvent(item._id)}
              >
                <Text style={{ color: 'white' }}>❌ Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {editingId && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.subtitle}>Düzenle</Text>
          <TextInput
            style={styles.input}
            placeholder="Başlık"
            value={editTitle}
            onChangeText={setEditTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Açıklama"
            value={editDescription}
            onChangeText={setEditDescription}
          />
          <Button title="✔️ Kaydet" onPress={updateEvent} />
        </View>
      )}
    </View>
  );
}