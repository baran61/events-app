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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { globalStyles as styles } from './styles/globalStyles';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Eksik Alan', 'Lütfen kullanıcı adı ve şifreyi girin.');
      return;
    }

    try {
      await AsyncStorage.setItem('registeredUser', JSON.stringify({ username, password }));
      Alert.alert('Kayıt Başarılı', 'Giriş yapabilirsiniz.');
      router.replace('/login');
    } catch (e) {
      Alert.alert('Hata', 'Kayıt sırasında bir sorun oluştu.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
