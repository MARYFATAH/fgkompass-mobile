import { useClerk, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Platform, Pressable, StyleSheet, Text } from "react-native";

import { hasClerkPublishableKey } from "../constants/auth";
import { BRAND_COLORS } from "../constants/theme";

function goToSignIn(router) {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    window.location.assign("/sign-in");
    return;
  }

  router.push("/sign-in");
}

export default function AuthButton({
  signedOutLabel = "Sign in",
  style,
  textStyle,
}) {
  if (!hasClerkPublishableKey) {
    return (
      <FallbackAuthButton
        signedOutLabel={signedOutLabel}
        style={style}
        textStyle={textStyle}
      />
    );
  }

  return (
    <ClerkAuthButton
      signedOutLabel={signedOutLabel}
      style={style}
      textStyle={textStyle}
    />
  );
}

function FallbackAuthButton({ signedOutLabel, style, textStyle }) {
  const router = useRouter();

  return (
      <Pressable onPress={() => goToSignIn(router)} style={[styles.button, style]}>
        <Text style={[styles.text, textStyle]}>{signedOutLabel}</Text>
      </Pressable>
  );
}

function ClerkAuthButton({ signedOutLabel, style, textStyle }) {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handlePress = async () => {
    if (!isSignedIn) {
      goToSignIn(router);
      return;
    }

    await signOut();
    router.replace("/");
  };

  return (
    isSignedIn ? (
      <Pressable onPress={handlePress} style={[styles.button, style]}>
        <Text style={[styles.text, textStyle]}>
          {`Sign out ${user?.firstName || ""}`.trim()}
        </Text>
      </Pressable>
    ) : (
        <Pressable onPress={() => goToSignIn(router)} style={[styles.button, style]}>
          <Text style={[styles.text, textStyle]}>{signedOutLabel}</Text>
        </Pressable>
    )
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: BRAND_COLORS.border,
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 10,
  },
  text: {
    color: BRAND_COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
  },
});
