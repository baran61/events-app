import { useEffect } from 'react';
import { useRouter, useNavigationContainerRef } from 'expo-router';
import { useRootNavigationState } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return; // Layout henüz hazır değil

    router.replace('/login'); // Layout yüklendiyse yönlendir
  }, [rootNavigationState]);

  return null;
}
