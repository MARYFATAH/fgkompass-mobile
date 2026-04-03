import { useSignIn } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Platform, Text, View } from "react-native";

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
  const [statusMessage, setStatusMessage] = useState("");
  const verificationCodeRequestedRef = useRef(false);

  const finalizeSignIn = async () => {
    await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) {
          console.log(session.currentTask);
          return;
        }

        const url = decorateUrl("/home");
        if (Platform.OS === "web" && typeof window !== "undefined") {
          window.location.assign(url);
        } else if (url.startsWith("http")) {
          window.location.href = url;
        } else {
          router.push(url);
        }
      },
    });
  };

  const requestEmailCodeIfAvailable = async () => {
    const emailCodeFactor = signIn.supportedSecondFactors?.find(
      (factor) => factor.strategy === "email_code",
    );

    if (emailCodeFactor) {
      await signIn.mfa.sendEmailCode();
      setStatusMessage("We sent you an email code to finish signing in.");
      verificationCodeRequestedRef.current = true;
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!signIn?.status) {
      return;
    }

    if (signIn.status === "complete") {
      void finalizeSignIn();
      return;
    }

    if (
      (signIn.status === "needs_client_trust" ||
        signIn.status === "needs_second_factor") &&
      !verificationCodeRequestedRef.current
    ) {
      void requestEmailCodeIfAvailable().then((sent) => {
        if (!sent) {
          setStatusMessage(`Additional verification is required: ${signIn.status}`);
        }
      });
      return;
    }

    if (signIn.status === "needs_first_factor") {
      setStatusMessage("Please complete the next verification step to continue.");
    }
  }, [signIn]);

  const handleSubmit = async () => {
    setStatusMessage("");
    verificationCodeRequestedRef.current = false;
    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      const sessionExists = error?.errors?.some?.(
        (item) => item?.code === "session_exists",
      );
      if (sessionExists) {
        const homeUrl = "/home";
        if (Platform.OS === "web" && typeof window !== "undefined") {
          window.location.assign(homeUrl);
        } else {
          router.replace(homeUrl);
        }
        return;
      }
      console.error(JSON.stringify(error, null, 2));
      return;
    }
  };

  const handleVerify = async () => {
    setStatusMessage("");
    await signIn.mfa.verifyEmailCode({ code });
  };

  if (
    signIn.status === "needs_client_trust" ||
    signIn.status === "needs_second_factor"
  ) {
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
        <AuthError>{statusMessage}</AuthError>
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
      footerLinkHref="/sign-up"
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
      <AuthError>{statusMessage}</AuthError>

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
