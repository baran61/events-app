import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a", // Siyah arka plan
    padding: 20,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#c084fc", // Açık mor ton
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#a855f7", // Orta mor tonu
  },

  text: {
    fontSize: 16,
    color: "#d4d4d8", // Açık gri
    lineHeight: 22,
  },

  input: {
    borderWidth: 1,
    borderColor: "#7c3aed", // Mor kenarlık
    backgroundColor: "#1f1f1f", // Koyu gri input
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    color: "#fff", // Yazılar beyaz
    shadowColor: "#7c3aed",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },

  // Etkinlik Kartları
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#7c3aed",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardInfo: {
    padding: 16,
  },

  // Buton
  section: {
    marginTop: 24,
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#7c3aed", // Canlı mor buton
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
    elevation: 2,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  // Linkler
  linkText: {
    marginTop: 20,
    textAlign: "center",
    color: "#c084fc", // Açık mor link
    fontSize: 16,
  },
});
