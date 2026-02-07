import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function MotherhoodScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>{t("lifePhase.family")}</Text>
    </View>
  );
}
