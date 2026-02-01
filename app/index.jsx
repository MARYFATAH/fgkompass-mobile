import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Landing() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "600", marginBottom: 16 }}>
        FG Kompass
      </Text>

      <Text style={{ textAlign: "center", marginBottom: 32 }}>
        A guide through every stage of women’s health
      </Text>

      <Pressable
        onPress={() => router.push("/home")}
        style={{
          backgroundColor: "#E91E63",
          paddingHorizontal: 28,
          paddingVertical: 14,
          borderRadius: 30,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Explore Life Phases</Text>
      </Pressable>
    </View>
  );
}
