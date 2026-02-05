import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";
import { client } from "../sanity/client";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    async function loadPosts() {
      const posts = await client.fetch(`*[_type=="post"][0..2]{title}`);
      console.log("SANITY POSTS 👉", posts);
    }
    loadPosts();
  }, []);

  return (
    <LinearGradient colors={["#fff", "#fdf2f8"]} style={styles.container}>
      {/* 🌸 LOGO */}
      <Animated.Image
        entering={FadeIn.duration(900)}
        source={require("../assets/images/fgkompass-logo.png")}
        style={styles.logo}
      />

      {/* 🌿 TITLE */}
      <Animated.Text
        entering={SlideInUp.delay(150).duration(700)}
        style={styles.title}
      >
        FG Kompass
      </Animated.Text>

      {/* ✨ SUBTITLE */}
      <Animated.Text
        entering={SlideInUp.delay(300).duration(700)}
        style={styles.subtitle}
      >
        A guide through every stage of women’s health
      </Animated.Text>

      {/* 🌱 CTA */}
      <Animated.View entering={SlideInUp.delay(500).duration(700)}>
        <Pressable onPress={() => router.push("/home")} style={styles.button}>
          <Text style={styles.buttonText}>Explore Life Phases</Text>
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
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 24,
    borderRadius: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#881337",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#475569",
    marginBottom: 36,
    lineHeight: 22,
    maxWidth: 280,
  },
  button: {
    backgroundColor: "#f43f5e",
    paddingHorizontal: 34,
    paddingVertical: 14,
    borderRadius: 30,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
