import { LinearGradient } from "expo-linear-gradient";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={["#ffe4e6", "#fecdd3", "#fda4af"]}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* TITLE */}
          <View style={styles.header}>
            <Text style={styles.title}>{t("contact.title")}</Text>
            <Text style={styles.subtitle}>{t("contact.subtitle")}</Text>
          </View>

          {/* FORM */}
          <View style={styles.card}>
            <View style={styles.field}>
              <Text style={styles.label}>{t("contact.name")}</Text>
              <TextInput
                placeholder={t("contact.namePlaceholder")}
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>{t("contact.email")}</Text>
              <TextInput
                placeholder={t("contact.emailPlaceholder")}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>{t("contact.message")}</Text>
              <TextInput
                placeholder={t("contact.messagePlaceholder")}
                multiline
                numberOfLines={5}
                style={[styles.input, styles.textarea]}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{t("contact.send")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "600",
    color: "#9f1239",
  },
  subtitle: {
    fontSize: 16,
    color: "#475569",
    marginTop: 10,
    textAlign: "center",
    maxWidth: 280,
  },
  card: {
    backgroundColor: "#ffffffee",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f1f5f9",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#0f172a",
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#f43f5e",
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
