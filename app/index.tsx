import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [navigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNavigationReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (navigationReady) {
      router.replace('/login');
    }
  }, [navigationReady]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
      <Text>Yönlendiriliyor...</Text>
    </View>
  );
}