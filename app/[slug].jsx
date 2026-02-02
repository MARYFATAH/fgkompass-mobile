import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function PostScreen() {
  const { slug } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text>Post slug:</Text>
      <Text>{slug}</Text>
    </View>
  );
}
