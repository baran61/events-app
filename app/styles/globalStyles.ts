import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  text: {
    fontSize: 16,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },

  // Etkinlik Kartları
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 160,
  },
  cardInfo: {
    padding: 12,
  },

  // Buton 
  section: {
    marginTop: 24,
    marginBottom: 32,
  },

  button: {
    backgroundColor: "#4b7bec",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Linkler
  linkText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#4b7bec',
  },
  
});
