import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function LifePhaseLayout() {
  const { t } = useTranslation();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: t("lifePhase.title") }} />
      <Stack.Screen name="young" options={{ title: t("lifePhase.youth") }} />
      <Stack.Screen
        name="motherhood"
        options={{ title: t("lifePhase.family") }}
      />
      <Stack.Screen name="midlife" options={{ title: t("lifePhase.midlife") }} />
      <Stack.Screen name="older" options={{ title: t("lifePhase.older") }} />
    </Stack>
  );
}
