import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView, Animated } from 'react-native';
import { globalStyles as styles } from '../styles/globalStyles';

export default function EventDetailScreen() {
  const { title, description, image, date } = useLocalSearchParams<{
    title?: string;
    description?: string;
    image?: string;
    date?: string;
  }>();

  const scrollY = new Animated.Value(0);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 24 }}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
    >
      {image ? (
        <Animated.Image
          source={{ uri: String(image) }}
          style={[
            styles.cardImage,
            {
              transform: [
                {
                  scale: scrollY.interpolate({
                    inputRange: [-200, 0, 200],
                    outputRange: [1.4, 1, 1],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
          resizeMode="cover"
        />
      ) : null}
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <Text style={[styles.text, { marginTop: 12 }]}>
          {description}
        </Text>

        <Text style={[styles.text, { marginTop: 16, fontWeight: 'bold' }]}>
          {date ? new Date(date as string).toLocaleDateString('tr-TR') : ''}
        </Text>
      </View>
    </ScrollView>
  );
}