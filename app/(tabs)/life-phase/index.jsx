import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function LifePhase() {
  const router = useRouter();

  const Card = ({ emoji, label, path }) => (
    <Pressable
      onPress={() => router.push(path)}
      style={({ pressed }) => ({
        width: 140,
        height: 140,
        borderRadius: 16,
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "center",
        margin: 8,
        transform: [{ scale: pressed ? 0.97 : 1 }],
        elevation: 3,
      })}
    >
      <Text style={{ fontSize: 36 }}>{emoji}</Text>
      <Text style={{ marginTop: 8, fontSize: 16, fontWeight: "600" }}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 16,
      }}
    >
      <Card emoji="🌱" label="Young" path="/life-phase/young" />
      <Card emoji="🤱" label="Motherhood" path="/life-phase/motherhood" />
      <Card emoji="🌸" label="Midlife" path="/life-phase/midlife" />
      <Card emoji="🌙" label="Older" path="/life-phase/older" />
    </View>
  );
}
