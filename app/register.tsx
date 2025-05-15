import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { globalStyles as styles } from "../styles/globalStyles";
import { API_BASE_URL } from "../constants/api";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }, [email]);

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Eksik Alan", "Lütfen kullanıcı adı ve şifreyi girin.");
      return;
    }

    if (username.length < 3) {
      Alert.alert(
        "Geçersiz Kullanıcı Adı",
        "Kullanıcı adı en az 3 karakter olmalıdır."
      );
      return;
    }

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      Alert.alert("Geçersiz Şifre", "Şifre kurallarına uymalısınız.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Şifre Eşleşmiyor", "Lütfen şifreleri aynı girin.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Hata", data.message || "Kayıt başarısız.");
        return;
      }

      // E-posta doğrulama maili gönder
      await fetch(`${API_BASE_URL}/auth/send-verification-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      Alert.alert("Doğrulama E-postası Gönderildi", "Lütfen e-posta adresinizi kontrol edin.");
      Alert.alert("Kayıt Başarılı", "Giriş yapabilirsiniz.");
      router.replace("/login");
    } catch (e) {
      Alert.alert("Hata", "Sunucuya bağlanılamadı.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="E-Posta Adresi"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text));
        }}
      />
      {!emailValid && (
        <Text style={{ color: "red", fontSize: 13 }}>
          • Geçerli bir e-posta adresi girin
        </Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoComplete="off"
        textContentType="none"
      />
      <View style={{ marginVertical: 8 }}>
        <Text
          style={{
            color: password.length >= 6 ? "green" : "red",
            fontSize: 13,
          }}
        >
          • En az 6 karakter
        </Text>
        <Text
          style={{
            color: /[A-Z]/.test(password) ? "green" : "red",
            fontSize: 13,
          }}
        >
          • En az 1 büyük harf
        </Text>
        <Text
          style={{ color: /\d/.test(password) ? "green" : "red", fontSize: 13 }}
        >
          • En az 1 rakam
        </Text>
      </View>
      {confirmPassword.length > 0 && password !== confirmPassword && (
        <Text style={{ color: "red", fontSize: 13 }}>
          • Şifreler eşleşmiyor
        </Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Şifre Tekrar"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoComplete="off"
        textContentType="none"
      />

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
