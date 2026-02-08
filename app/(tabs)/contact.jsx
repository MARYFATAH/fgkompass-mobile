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
import { useState } from "react";

export default function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    if (!name || !email || !message) {
      setError("Please fill all fields.");
      return;
    }

    setError("");
    setStatus("loading");

    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.root}>
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
                value={name}
                onChangeText={setName}
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
                value={email}
                onChangeText={setEmail}
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
                value={message}
                onChangeText={setMessage}
              />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
            {status === "success" ? (
              <Text style={styles.success}>Message sent.</Text>
            ) : null}

            <TouchableOpacity
              style={[styles.button, status === "loading" && styles.buttonDisabled]}
              onPress={onSubmit}
              disabled={status === "loading"}
            >
              <Text style={styles.buttonText}>{t("contact.send")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    marginTop: 24,
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#9F1239",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
    maxWidth: 320,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FCE7F3",
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FCE7F3",
    borderRadius: 12,
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
    backgroundColor: "#E11D48",
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  error: {
    color: "#B91C1C",
    fontSize: 13,
    marginTop: 6,
  },
  success: {
    color: "#15803D",
    fontSize: 13,
    marginTop: 6,
  },
});
