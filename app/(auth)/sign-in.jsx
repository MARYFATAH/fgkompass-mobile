import { useSignIn } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import AuthScreen, {
  AuthButton,
  AuthError,
  AuthInput,
  AuthLabel,
} from "./AuthScreen";
import { BRAND_COLORS } from "../../constants/theme.js";

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    const { error } = await signIn.password({
        emailAddress,
        password,
      });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
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
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await signIn.finalize({
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
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  if (signIn.status === "needs_client_trust") {
    return (
      <AuthScreen
        title="Verify your email"
        subtitle="Enter the verification code to continue signing in."
      >
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
        <AuthButton secondary onPress={() => signIn.mfa.sendEmailCode()}>
          Send a new code
        </AuthButton>
        <AuthButton secondary onPress={() => signIn.reset()}>
          Start over
        </AuthButton>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen
      title="Sign in"
      subtitle="Access your saved progress and private space."
      footerText="Don't have an account?"
      footerLinkHref="/(auth)/sign-up"
      footerLinkLabel="Sign up"
    >
      <AuthLabel>Email</AuthLabel>
      <AuthInput
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        value={emailAddress}
        onChangeText={setEmailAddress}
        placeholder="you@example.com"
      />
      <AuthError>{errors?.fields?.identifier?.message}</AuthError>

      <AuthLabel>Password</AuthLabel>
      <AuthInput
        secureTextEntry
        autoComplete="password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
      />
      <AuthError>{errors?.fields?.password?.message}</AuthError>

      <AuthButton
        onPress={handleSubmit}
        disabled={!emailAddress || !password || fetchStatus === "fetching"}
      >
        Continue
      </AuthButton>

      <View style={{ marginTop: 6 }}>
        <Text style={{ color: BRAND_COLORS.textSoft, fontSize: 12 }}>
          You can keep browsing the app without signing in.
        </Text>
      </View>
    </AuthScreen>
  );
}
