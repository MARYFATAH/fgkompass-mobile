import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import MinimalCard from "../../components/MinimalCard";
import MoreOnTopic from "../../components/MoreOnTopic";
import { client } from "../../sanity/client";

const { width } = Dimensions.get("window");
const HERO_HEIGHT = 280;

export default function Home() {
  const scrollY = useSharedValue(0);
  const [featured, setFeatured] = useState([]);
  const [lifePhase, setLifePhase] = useState("motherhood"); // later from profile

  useEffect(() => {
    const query = `*[
      _type == "post" &&
      featured == true &&
      defined(slug.current)
    ][0...5]{
      _id,
      title,
      excerpt,
      "imageUrl": image.asset->url,
      slug
    }`;

    client.fetch(query).then(setFeatured);
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const heroStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, HERO_HEIGHT],
      [HERO_HEIGHT, 120],
      Extrapolate.CLAMP,
    ),
  }));

  const heroImageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          [0, HERO_HEIGHT],
          [1, 1.15],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  return (
    <View style={{ flex: 1 }}>
      {/* 🌸 STICKY HERO */}
      <Animated.View style={[styles.hero, heroStyle]}>
        <Animated.Image
          source={require("../../assets/strongwomen.jpg")}
          style={[styles.heroImage, heroImageStyle]}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.35)"]}
          style={styles.heroOverlay}
        />
        <View style={styles.heroText}>
          <Text style={styles.heroTitle}>Strong women</Text>
          <Text style={styles.heroSubtitle}>Guidance for every life phase</Text>
        </View>
      </Animated.View>

      {/* 📜 CONTENT */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
      >
        {/* 🌿 EXPLORE — HORIZONTAL */}
        <Section title="Explore">
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontal}
          >
            <MinimalCard title="Nutrition" link="/nutrition" />
            <MinimalCard title="Mental Health" link="/mental-health" />
            <MinimalCard title="Fitness" link="/fitness" />
            <MinimalCard title="Hormones" link="/hormones" />
            <MinimalCard title="Motherhood" link="/life-phase/motherhood" />
          </Animated.ScrollView>
        </Section>

        {/* 🧬 LIFE PHASE */}
        <Section title="For your life phase">
          <View style={styles.phaseCard}>
            <Text style={styles.phaseTitle}>
              {lifePhase === "motherhood"
                ? "Family & Relationships"
                : "Your current phase"}
            </Text>
            <Text style={styles.phaseText}>
              Curated articles and tools for your current stage of life.
            </Text>

            <Link href={`/life-phase/${lifePhase}`} asChild>
              <Pressable style={styles.phaseButton}>
                <Text style={styles.phaseButtonText}>Explore</Text>
              </Pressable>
            </Link>
          </View>
          <View style={styles.phaseCard}>
            <Text style={styles.phaseTitle}>
              {lifePhase === "motherhood"
                ? "Family & Relationships"
                : "Your current phase"}
            </Text>
            <Text style={styles.phaseText}>
              Curated articles and tools for your current stage of life.
            </Text>

            <Link href={`/life-phase/${lifePhase}`} asChild>
              <Pressable style={styles.phaseButton}>
                <Text style={styles.phaseButtonText}>Explore</Text>
              </Pressable>
            </Link>
          </View>
        </Section>

        {/* 💡 MORE ON TOPIC */}
        <Section title="More on this topic">
          <MoreOnTopic />
        </Section>

        {/* 📰 FEATURED */}
        <Section title="Featured Articles">
          {featured.map((post) => (
            <View key={post._id} style={styles.article}>
              <Image
                source={{ uri: post.imageUrl }}
                style={styles.articleImage}
              />
              <View style={styles.articleBody}>
                <Text style={styles.articleTitle}>{post.title}</Text>
                <Text style={styles.articleExcerpt} numberOfLines={3}>
                  {post.excerpt}
                </Text>
                <Link href={`/${post.slug.current}`} asChild>
                  <Pressable>
                    <Text style={styles.readMore}>Read more →</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          ))}
        </Section>
      </Animated.ScrollView>
    </View>
  );
}

/* 🧱 SECTION WRAPPER */
const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

/* 🎨 STYLES */
const styles = StyleSheet.create({
  hero: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroText: {
    position: "absolute",
    bottom: 30,
    left: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
  },
  heroSubtitle: {
    fontSize: 15,
    color: "#fce7f3",
    marginTop: 6,
  },

  content: {
    paddingTop: HERO_HEIGHT + 20,
    paddingBottom: 100,
  },

  section: {
    paddingHorizontal: 20,
    marginBottom: 42,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#9f1239",
    marginBottom: 16,
  },

  horizontal: {
    gap: 16,
    paddingRight: 20,
  },

  phaseCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#881337",
  },
  phaseText: {
    fontSize: 14,
    color: "#475569",
    marginVertical: 10,
  },
  phaseButton: {
    alignSelf: "flex-start",
    backgroundColor: "#f43f5e",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  phaseButtonText: {
    color: "#fff",
    fontWeight: "500",
  },

  article: {
    backgroundColor: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 22,
  },
  articleImage: {
    width: "100%",
    height: 180,
  },
  articleBody: {
    padding: 16,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#881337",
  },
  articleExcerpt: {
    fontSize: 14,
    color: "#475569",
    marginVertical: 8,
  },
  readMore: {
    color: "#f43f5e",
    fontWeight: "500",
  },
});
