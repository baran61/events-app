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

const validRefs = ["ABC123", "XYZ789"];

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [refCode, setRefCode] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password || !refCode) {
      Alert.alert("Eksik Alan", "Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem("registeredUser");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (
        !parsedUser ||
        parsedUser.username !== username ||
        parsedUser.password !== password
      ) {
        Alert.alert("Hatalı Giriş", "Kullanıcı adı veya şifre yanlış.");
        return;
      }

      if (!validRefs.includes(refCode)) {
        Alert.alert(
          "Geçersiz Referans",
          "Lütfen geçerli bir referans kodu girin."
        );
        return;
      }

      await AsyncStorage.setItem("username", username);
      router.replace("/(tabs)");
    } catch (e) {
      Alert.alert("Hata", "Giriş sırasında bir hata oluştu.");
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
