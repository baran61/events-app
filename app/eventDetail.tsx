import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { globalStyles as styles } from "../styles/globalStyles";
import * as Linking from "expo-linking";
import { Button, Alert } from "react-native";
import { API_BASE_URL } from "../constants/api";

export default function EventDetailScreen() {
  const { title, description, image, date } = useLocalSearchParams<{
    title?: string;
    description?: string;
    image?: string;
    date?: string;
  }>();

  const router = useRouter();

  const scrollY = new Animated.Value(0);
  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 32 }}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {image && (
        <Animated.Image
          source={{ uri: String(image) }}
          style={[
            styles.cardImage,
            {
              width: screenWidth,
              height: 300,
              transform: [
                {
                  scale: scrollY.interpolate({
                    inputRange: [-200, 0, 200],
                    outputRange: [1.4, 1, 1],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
          resizeMode="cover"
        />
      )}
      <View
        style={{
          padding: 24,
          backgroundColor: "#1a1a1a",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: -24,
        }}
      >
        <Text style={[styles.title, { textAlign: "center" }]}>{title}</Text>
        <Text
          style={[
            styles.text,
            {
              marginTop: 16,
              fontSize: 17,
              textAlign: "center",
              color: "#d4d4d8",
            },
          ]}
        >
          {description}
        </Text>
        {date && (
          <Text
            style={{
              marginTop: 20,
              color: "#a855f7",
              fontSize: 16,
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            📅 {new Date(date as string).toLocaleDateString("tr-TR")}
          </Text>
        )}
        <Button
          title="🎟️ Bilet Satın Al"
          onPress={async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/payment-link`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  price: 100,
                  userEmail: "kullanici@eposta.com",
                }),
              });
              const data = await response.json();
              if (data.paymentPageUrl) {
                Linking.openURL(data.paymentPageUrl);

                // Ödeme tamamlandıktan sonra kullanıcı callback ile uygulamaya dönerse yönlendirme yapılabilir.
                const callbackUrl = `${API_BASE_URL}/payment-status`;
                const interval = setInterval(async () => {
                  try {
                    const res = await fetch(callbackUrl);
                    const status = await res.json();
                    if (status.success) {
                      // 1. Alert göster
                      Alert.alert("Başarılı", "Ödemeniz başarıyla gerçekleşti.");

                      // 2. Bileti kaydet
                      await fetch(`${API_BASE_URL}/tickets`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          eventTitle: title,
                          userEmail: "kullanici@eposta.com", // Buraya gerçek kullanıcının email adresini koyabilirsin
                        }),
                      });

                      // 3. Interval'ı durdur
                      clearInterval(interval);

                      // 4. Başka bir ekrana yönlendirme
                      router.push("/eventDetail"); // İstersen özel bir teşekkür ekranına yönlendirebiliriz
                    }
                  } catch (err) {
                    console.error("Ödeme durumu kontrolü başarısız:", err);
                  }
                }, 3000);
              }
            } catch (error) {
              console.error("Bilet ödeme bağlantısı alınamadı:", error);
            }
          }}
          color="#7c3aed"
        />
      </View>
    </ScrollView>
  );
}
