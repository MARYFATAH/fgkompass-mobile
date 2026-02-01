import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function AboutUs() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="information-circle" size={64} color="#E91E63" />

      <Text style={{ fontSize: 24, marginTop: 12 }}>About Us</Text>
    </View>
  );
}
