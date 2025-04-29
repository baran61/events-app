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
import { globalStyles as styles } from "../styles/globalStyles";
import { API_BASE_URL } from '../constants/api';
 
const validRefs = ["ABC123", "XYZ789"];

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [refCode, setRefCode] = useState("");
  const router = useRouter();
 

  const handleLogin = async () => {
    if (!username || !password || !refCode) {
      Alert.alert('Eksik Alan', 'Tüm alanları doldurun.');
      return;
    }

    // Referans kodu sadece ek bir frontend kontrolü, gerçek adminlik token'dan alınacak
    if (!validRefs.includes(refCode)) {
      Alert.alert('Geçersiz Referans', 'Referans kodu hatalı.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Giriş Hatalı', data.message || 'Giriş yapılamadı.');
        return;
      }

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('username', username);

      // Token'ı decode et
      const tokenParts = data.token.split('.');
      const base64 = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(atob(base64));

      console.log('LOGIN PAYLOAD:', decodedPayload);

      const isAdminFromToken = decodedPayload.isAdmin === true;

      await AsyncStorage.setItem('isAdmin', JSON.stringify(isAdminFromToken));

      router.replace('/(tabs)');

    } catch (e) {
      Alert.alert('Hata', 'Sunucuya bağlanılamadı.');
      console.error('Login error:', e);
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
