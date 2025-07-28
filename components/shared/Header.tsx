import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>BlogEscolaXPTO</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",    
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "none",
  },
  title: {  
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
    textAlign: "center",
  }
});