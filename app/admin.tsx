import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { API_BASE_URL } from "../constants/api";
import { globalStyles as styles } from "../styles/globalStyles";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { uploadImageToCloudinary } from "../utils/cloudinaryUpload";

export default function AdminScreen() {
  const router = useRouter();
  const [events, setEvents] = useState([]); 
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDate, setNewDate] = useState(new Date());
  const [showAddDatePicker, setShowAddDatePicker] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editDate, setEditDate] = useState(new Date());
  const [showEditDatePicker, setShowEditDatePicker] = useState(false);
  const [eventType, setEventType] = useState("normal");
  const [showEventTypePicker, setShowEventTypePicker] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [eventType]);

  const fetchEvents = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const endpoint = eventType === "normal" ? "/admin/events" : "/admin/upcoming";
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Etkinlikler çekilemedi:", error);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("İzin Gerekli", "Fotoğraf seçmek için izin vermeniz gerekiyor!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets?.length > 0) {
      setNewImage(result.assets[0].uri);
    }
  };

  const addEvent = async () => {
    if (!newTitle || !newDescription) {
      Alert.alert("Eksik Bilgi", "Başlık ve açıklama giriniz.");
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");
      const uploadedImageUrl = await uploadImageToCloudinary(newImage);
      const endpoint = eventType === "normal" ? "/admin/events" : "/admin/upcoming";

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          image: uploadedImageUrl,
          date: newDate,
        }),
      });

      if (!res.ok) throw new Error("Etkinlik eklenemedi");

      setNewTitle("");
      setNewDescription("");
      setNewImage("");
      fetchEvents();
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Etkinlik eklenemedi");
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const endpoint = eventType === "normal" ? "/admin/events" : "/admin/upcoming";
      const res = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Etkinlik silinemedi");
      fetchEvents();
    } catch (error) {
      console.error("Etkinlik silinemedi:", error);
    }
  };

  const onChangeAddDate = (event: any, selectedDate?: Date) => {
    setShowAddDatePicker(false);
    if (selectedDate) setNewDate(selectedDate);
  };

  const renderHeader = () => (
    <View>
      <Text style={[styles.title, { marginTop: 40 }]}>Admin Paneli</Text>

      {/* Etkinlik Türü Seçimi */}
      <Text style={styles.subtitle}>Etkinlik Türü</Text>

      {Platform.OS === "web" ? (
        <select
          style={{
            height: 50,
            marginBottom: 20,
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: 8,
            padding: "0 10px",
            fontSize: 16,
            width: "100%",
          }}
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="normal">Normal Etkinlik</option>
          <option value="upcoming">Yaklaşan Etkinlik</option>
        </select>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setShowEventTypePicker(true)}
            style={{
              backgroundColor: "#333",
              borderColor: "#555",
              borderWidth: 1,
              borderRadius: 8,
              paddingVertical: 14,
              paddingHorizontal: 12,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {eventType === "normal" ? "Normal Etkinlik" : "Yaklaşan Etkinlik"}
            </Text>
          </TouchableOpacity>

          {showEventTypePicker && (
            <View
              style={{
                backgroundColor: "#222",
                borderRadius: 8,
                overflow: "hidden",
                marginBottom: 20,
              }}
            >
              <Picker
                selectedValue={eventType}
                onValueChange={(itemValue: string) => {
                  setEventType(itemValue);
                  setShowEventTypePicker(false);
                }}
                style={{ color: "#fff", backgroundColor: "#222", width: "100%" }}
              >
                <Picker.Item label="Normal Etkinlik" value="normal" />
                <Picker.Item label="Yaklaşan Etkinlik" value="upcoming" />
              </Picker>
            </View>
          )}
        </>
      )}

      {/* Yeni Etkinlik Girişi */}
      <TextInput
        style={[styles.input, { marginBottom: 20 }]}
        placeholder="Yeni Etkinlik Başlığı"
        placeholderTextColor="#888"
        value={newTitle}
        onChangeText={setNewTitle}
      />
      <TextInput
        style={[styles.input, { marginBottom: 20 }]}
        placeholder="Yeni Etkinlik Açıklaması"
        placeholderTextColor="#888"
        value={newDescription}
        onChangeText={setNewDescription}
      />
      <Button title="📸 Fotoğraf Seç" onPress={pickImage} />

      {newImage && (
        <Image
          source={{ uri: newImage }}
          style={{ width: "100%", height: 200, marginTop: 12, borderRadius: 8 }}
        />
      )}

      <Button title="📅 Tarih Seç" onPress={() => setShowAddDatePicker(true)} />
      {showAddDatePicker && (
        <DateTimePicker
          value={newDate}
          mode="date"
          display="default"
          onChange={onChangeAddDate}
        />
      )}

      <Text style={{ marginTop: 10, color: "#fff", textAlign: "center", fontSize: 16 }}>
        Seçilen Tarih: {newDate.toLocaleDateString()}
      </Text>

      <Button title="➕ Etkinlik Ekle" onPress={addEvent} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={events}
        keyExtractor={(item: any) => item._id}
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={{ marginTop: 20, padding: 10, borderWidth: 1, borderRadius: 8, borderColor: "#444" }}>
            <Text style={[styles.subtitle, { color: "#ffffff" }]}>{item.title}</Text>
            <Text style={[styles.text, { color: "#ffffff" }]}>{item.description}</Text>
            {item.date && (
              <Text style={[styles.text, { color: "#ffffff" }]}>
                Tarih: {new Date(item.date).toLocaleDateString()}
              </Text>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}