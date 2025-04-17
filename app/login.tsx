import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { loginStyles as styles } from './styles/loginStyles'; 

const validRefs = ['ABC123', 'XYZ789'];

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [refCode, setRefCode] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!username || !password || !refCode) {
      Alert.alert('Şifre Giriniz', 'Lütfen tüm alanları doldurun.');
      return;
    }

    if (!validRefs.includes(refCode)) {
      Alert.alert('Geçersiz Referans', 'Lütfen geçerli bir referans kodu girin.');
      return;
    }

    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
    </KeyboardAvoidingView>
  );
}
