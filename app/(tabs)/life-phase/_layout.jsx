import { Stack } from "expo-router";

export default function LifePhaseLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Choose Life Phase" }} />
      <Stack.Screen name="young" options={{ title: "Young" }} />
      <Stack.Screen name="motherhood" options={{ title: "Motherhood" }} />
      <Stack.Screen name="midlife" options={{ title: "Midlife" }} />
      <Stack.Screen name="older" options={{ title: "Older" }} />
    </Stack>
  );
}
