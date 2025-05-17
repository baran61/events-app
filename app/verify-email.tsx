import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Alert, View, ActivityIndicator } from "react-native";
import { API_BASE_URL } from "../constants/api";

export default function VerifyEmailScreen() {
  const { token } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE_URL}/auth/verify-email?token=${token}`)
      .then((res) => {
        if (!res.ok) throw new Error("Doğrulama başarısız");
        return res.text();
      })
      .then(() => {
        Alert.alert("Başarılı", "E-posta doğrulandı. Şimdi giriş yapabilirsiniz.");
        router.replace("/login");
      })
      .catch(async (err) => {
        const message = await err?.message;
        Alert.alert("Hata", message || "Bağlantı geçersiz veya süresi dolmuş.");
        router.replace("/login");
      });
  }, [token]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}