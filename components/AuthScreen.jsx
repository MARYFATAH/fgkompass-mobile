import { Link } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import BrandScreen from "./BrandScreen";
import { BRAND_CARD, BRAND_COLORS } from "../constants/theme";

export default function AuthScreen({
  title,
  subtitle,
  children,
  footerText,
  footerLinkHref,
  footerLinkLabel,
}) {
  return (
    <BrandScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          <View style={styles.card}>{children}</View>
          {footerText && footerLinkHref && footerLinkLabel ? (
            <View style={styles.footer}>
              <Text style={styles.footerText}>{footerText}</Text>
              <Link href={footerLinkHref} asChild>
                <Pressable>
                  <Text style={styles.footerLink}>{footerLinkLabel}</Text>
                </Pressable>
              </Link>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </BrandScreen>
  );
}

export function AuthInput(props) {
  return (
    <TextInput
      placeholderTextColor={BRAND_COLORS.textSoft}
      style={styles.input}
      {...props}
    />
  );
}

export function AuthLabel({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

export function AuthButton({ children, secondary, disabled, style, textStyle, ...props }) {
  return (
    <Pressable
      disabled={disabled}
      style={[
        secondary ? styles.secondaryButton : styles.button,
        disabled && styles.buttonDisabled,
        style,
      ]}
      {...props}
    >
      <Text style={[secondary ? styles.secondaryButtonText : styles.buttonText, textStyle]}>
        {children}
      </Text>
    </Pressable>
  );
}

export function AuthError({ children }) {
  if (!children) return null;
  return <Text style={styles.error}>{children}</Text>;
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: BRAND_COLORS.title,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: BRAND_COLORS.textMuted,
  },
  card: {
    ...BRAND_CARD,
    borderRadius: 20,
    padding: 18,
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: BRAND_COLORS.textMuted,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.96)",
    borderWidth: 1,
    borderColor: BRAND_COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: BRAND_COLORS.text,
  },
  button: {
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: BRAND_COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: BRAND_COLORS.border,
    backgroundColor: BRAND_COLORS.surface,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 8,
  },
  secondaryButtonText: {
    color: BRAND_COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  error: {
    color: BRAND_COLORS.danger,
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    alignItems: "center",
  },
  footerText: {
    color: BRAND_COLORS.textMuted,
    fontSize: 14,
  },
  footerLink: {
    color: BRAND_COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});
