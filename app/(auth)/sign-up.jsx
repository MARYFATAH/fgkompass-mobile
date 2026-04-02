import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AuthScreen, {
  AuthButton,
  AuthError,
  AuthInput,
  AuthLabel,
} from "./AuthScreen";
import { BRAND_COLORS } from "../../constants/theme";

export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleSignUp = async () => {
    const { error } = await signUp.password({
        emailAddress,
        password,
      });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    await signUp.verifications.sendEmailCode();
  };

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          }

          const url = decorateUrl("/(tabs)/home");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url);
          }
        },
      });
    } else {
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  const needsVerification =
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0;

  return (
    <AuthScreen
      title={needsVerification ? "Verify your email" : "Create account"}
      subtitle={
        needsVerification
          ? "Enter the email code sent by Clerk to finish creating your account."
          : "Create a private account for saved progress and personalized features."
      }
      footerText={needsVerification ? null : "Already have an account?"}
      footerLinkHref={needsVerification ? null : "/(auth)/sign-in"}
      footerLinkLabel={needsVerification ? null : "Sign in"}
    >
      {needsVerification ? (
        <>
          <AuthLabel>Email code</AuthLabel>
          <AuthInput
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            placeholder="Enter verification code"
          />

          <AuthError>{errors?.fields?.code?.message}</AuthError>

          <AuthButton onPress={handleVerify} disabled={fetchStatus === "fetching"}>
            Verify email
          </AuthButton>

          <AuthButton
            secondary
            onPress={() => signUp.verifications.sendEmailCode()}
          >
            Send a new code
          </AuthButton>
        </>
      ) : (
        <>
          <AuthLabel>Email</AuthLabel>
          <AuthInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            value={emailAddress}
            onChangeText={setEmailAddress}
            placeholder="you@example.com"
          />
          <AuthError>{errors?.fields?.emailAddress?.message}</AuthError>

          <AuthLabel>Password</AuthLabel>
          <AuthInput
            secureTextEntry
            autoComplete="password-new"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
          />
          <AuthError>{errors?.fields?.password?.message}</AuthError>

          <AuthButton
            onPress={handleSignUp}
            disabled={!emailAddress || !password || fetchStatus === "fetching"}
          >
            Create account
          </AuthButton>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href={"/(auth)/sign-in"} asChild>
              <Text style={styles.footerLink}>Sign in</Text>
            </Link>
          </View>

          <View nativeID="clerk-captcha" />
        </>
      )}
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  footerRow: {
    flexDirection: "row",
    gap: 4,
    marginTop: 12,
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
