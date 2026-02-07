import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function OlderScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>{t("lifePhase.older")}</Text>
    </View>
  );
}
