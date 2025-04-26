import { Platform } from 'react-native';

const localIP =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? 'http://192.168.1.148:5050/api' 
    : 'http://localhost:5050/api';

export const API_BASE_URL = localIP;