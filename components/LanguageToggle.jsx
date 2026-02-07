import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const isEN = i18n.language === "en";

  const toggle = () => {
    i18n.changeLanguage(isEN ? "de" : "en");
  };

  return (
    <Pressable onPress={toggle} style={styles.button}>
      <View style={[styles.pill, isEN ? styles.activeLeft : styles.activeRight]}>
        <Text style={[styles.label, isEN && styles.activeLabel]}>EN</Text>
        <Text style={[styles.label, !isEN && styles.activeLabel]}>DE</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  pill: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#FCE7F3",
    backgroundColor: "#FFF7FB",
  },
  activeLeft: {},
  activeRight: {},
  label: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
  },
  activeLabel: {
    color: "#9F1239",
  },
});
