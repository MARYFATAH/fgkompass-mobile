import { useClerk, useUser } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

import { hasClerkPublishableKey } from "../constants/auth";
import { BRAND_COLORS } from "../constants/theme";

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
  return (
    <Link href="/sign-in" asChild>
      <Pressable style={[styles.button, style]}>
        <Text style={[styles.text, textStyle]}>{signedOutLabel}</Text>
      </Pressable>
    </Link>
  );
}

function ClerkAuthButton({ signedOutLabel, style, textStyle }) {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handlePress = async () => {
    if (!isSignedIn) {
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
      <Link href="/sign-in" asChild>
        <Pressable style={[styles.button, style]}>
          <Text style={[styles.text, textStyle]}>{signedOutLabel}</Text>
        </Pressable>
      </Link>
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
