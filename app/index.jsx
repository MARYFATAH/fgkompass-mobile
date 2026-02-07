import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { client } from "../sanity/client";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../components/LanguageToggle";

export default function Landing() {
  const router = useRouter();
  const { t } = useTranslation();
  const floatY = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    async function loadPosts() {
      const posts = await client.fetch(`*[_type=="post"][0..2]{title}`);
      console.log("SANITY POSTS 👉", posts);
    }
    loadPosts();

    floatY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2200 }),
        withTiming(0, { duration: 2200 }),
      ),
      -1,
      true,
    );

    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1400 }),
        withTiming(0, { duration: 1400 }),
      ),
      -1,
      true,
    );
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + pulse.value * 0.35,
    transform: [{ scale: 1 + pulse.value * 0.08 }],
  }));

  return (
    <LinearGradient
      colors={["#FFF7FB", "#FDE7F0", "#F9E8FF"]}
      style={styles.container}
    >
      <View style={styles.toggleWrap}>
        <LanguageToggle />
      </View>
      {/* Ambient blobs */}
      <Animated.View style={[styles.blob, styles.blobLeft, glowStyle]} />
      <Animated.View style={[styles.blob, styles.blobRight, glowStyle]} />

      {/* 🌸 LOGO */}
      <Animated.View style={[styles.logoWrap, floatingStyle]}>
        <Animated.Image
          entering={FadeIn.duration(900)}
          source={require("../assets/images/fgkompass-logo.png")}
          style={styles.logo}
        />
      </Animated.View>

      {/* 🌿 TITLE */}
      <Animated.Text
        entering={SlideInUp.delay(150).duration(700)}
        style={styles.title}
      >
        {t("landing.title")}
      </Animated.Text>

      {/* ✨ SUBTITLE */}
      <Animated.Text
        entering={SlideInUp.delay(300).duration(700)}
        style={styles.subtitle}
      >
        {t("landing.subtitle")}
      </Animated.Text>

      {/* 🌱 CTA */}
      <Animated.View entering={FadeInDown.delay(450).duration(700)}>
        <Pressable onPress={() => router.push("/home")} style={styles.button}>
          <Text style={styles.buttonText}>{t("landing.cta")}</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/life-phase")}
          style={styles.link}
        >
          <Text style={styles.linkText}>{t("common.browseLifePhases")}</Text>
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fdf2f8",
  },
  toggleWrap: {
    position: "absolute",
    top: 44,
    right: 16,
    zIndex: 10,
  },
  blob: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 200,
    backgroundColor: "rgba(255,255,255,0.55)",
  },
  blobLeft: {
    top: -40,
    left: -40,
  },
  blobRight: {
    bottom: -60,
    right: -30,
  },
  logoWrap: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 80,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#881337",
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#475569",
    marginBottom: 36,
    lineHeight: 22,
    maxWidth: 300,
  },
  button: {
    backgroundColor: "#E11D48",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  link: {
    marginTop: 14,
    alignItems: "center",
  },
  linkText: {
    color: "#9F1239",
    fontSize: 14,
    fontWeight: "600",
  },
});
