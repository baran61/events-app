import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { globalStyles as styles } from "./styles/globalStyles";
import { API_BASE_URL } from '../constants/api';
 
const validRefs = ["ABC123", "XYZ789"];

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [refCode, setRefCode] = useState("");
  const router = useRouter();
 


  const handleLogin = async () => {
    if (!username || !password || !refCode) {
      Alert.alert('Eksik Alan', 'Lütfen tüm alanları doldurun.');
      return;
    }
  
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        Alert.alert('Giriş Hatalı', data.message || 'Giriş yapılamadı.');
        return;
      }
  
      if (!validRefs.includes(refCode)) {
        Alert.alert('Geçersiz Referans', 'Referans kodu hatalı.');
        return;
      }
  
      await AsyncStorage.setItem('username', username);
      // await AsyncStorage.setItem('token', data.token); ← ileride JWT ile
      router.replace('/(tabs)');
    } catch (e) {
      Alert.alert('Hata', 'Sunucuya bağlanılamadı.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Etkinlik Giriş</Text>

      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Referans Kodu"
        value={refCode}
        onChangeText={setRefCode}
        autoCapitalize="characters"
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/register")}>
        <Text style={styles.linkText}>Hesabın yok mu? Kayıt ol</Text>
      </Pressable>
      
    </KeyboardAvoidingView>
  );
}
