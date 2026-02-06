import { Stack } from "expo-router";

export default function LifePhaseLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Life Phases" }} />
      <Stack.Screen name="young" options={{ title: "Youth" }} />
      <Stack.Screen
        name="motherhood"
        options={{ title: "Family & Relationships" }}
      />
      <Stack.Screen name="midlife" options={{ title: "Midlife" }} />
      <Stack.Screen name="older" options={{ title: "Older Adult Wellness" }} />
    </Stack>
  );
}
