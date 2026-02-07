import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  FadeIn,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";

import MinimalCard from "../../components/MinimalCard";
import MoreOnTopic from "../../components/MoreOnTopic";
import { client } from "../../sanity/client";

const HERO_HEIGHT = 240;

const EXPLORE_CARDS = [
  {
    key: "menopause",
    href: "/menopause",
    image: require("../../assets/images/menopause.jpg"),
  },
  {
    key: "pregnancy",
    href: "/pregnancy",
    image: require("../../assets/images/pregnancy.jpg"),
  },
  {
    key: "breastCancer",
    href: "/breast-cancer",
    image: require("../../assets/images/breast-cancer.jpg"),
  },
  {
    key: "diabetes",
    href: "/diabetes",
    image: require("../../assets/images/diabetes.jpg"),
  },
  {
    key: "heartDisease",
    href: "/heart-disease",
    image: require("../../assets/images/heart-disease.jpg"),
  },
];

export default function Home() {
  const scrollY = useSharedValue(0);
  const [featured, setFeatured] = useState([]);
  const [lifePhase, setLifePhase] = useState("motherhood"); // later from profile
  const { t } = useTranslation();

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
      [HERO_HEIGHT, 150],
      Extrapolate.CLAMP,
    ),
  }));

  const heroImageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          [0, HERO_HEIGHT],
          [1, 1.05],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  const heroTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, HERO_HEIGHT * 0.6],
      [1, 0.3],
      Extrapolate.CLAMP,
    ),
  }));

  return (
    <View style={styles.root}>
      {/* HERO */}
      <Animated.View style={[styles.hero, heroStyle]}>
        <Animated.Image
          source={require("../../assets/strongwomen.jpg")}
          style={[styles.heroImage, heroImageStyle]}
        />
        <LinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.9)"]}
          style={styles.heroOverlay}
        />
        <Animated.View style={[styles.heroText, heroTextStyle]}>
          <Text style={styles.heroTitle}>{t("home.heroTitle")}</Text>
          <Text style={styles.heroSubtitle}>{t("home.heroSubtitle")}</Text>
        </Animated.View>
      </Animated.View>

      {/* CONTENT */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Section title={t("home.sectionExplore")}>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontal}
          >
            {EXPLORE_CARDS.map((card) => (
              <MinimalCard
                key={card.key}
                title={t(`home.exploreCards.${card.key}`)}
                link={card.href}
                imageSource={card.image}
              />
            ))}
          </Animated.ScrollView>
        </Section>

        <Section title={t("home.sectionLifePhase")}>
          <View style={styles.phaseCard}>
            <Text style={styles.phaseTitle}>
              {lifePhase === "motherhood"
                ? t("home.phaseFamily")
                : t("home.phaseDefault")}
            </Text>
            <Text style={styles.phaseText}>{t("home.phaseText")}</Text>

            <Link href={`/life-phase/${lifePhase}`} asChild>
              <Pressable style={styles.phaseButton}>
                <Text style={styles.phaseButtonText}>
                  {t("common.explore")}
                </Text>
              </Pressable>
            </Link>
          </View>
        </Section>

        <Section title={t("home.sectionMore")}>
          <MoreOnTopic />
        </Section>

        <Section title={t("home.sectionFeatured")}>
          {featured.map((post) => (
            <Animated.View key={post._id} entering={FadeIn.duration(500)}>
              <View style={styles.article}>
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
                      <Text style={styles.readMore}>
                        {t("common.readMore")}
                      </Text>
                    </Pressable>
                  </Link>
                </View>
              </View>
            </Animated.View>
          ))}
        </Section>
      </Animated.ScrollView>
    </View>
  );
}

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  hero: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
    overflow: "hidden",
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
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
    bottom: 20,
    left: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#9F1239",
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },

  content: {
    paddingTop: HERO_HEIGHT + 16,
    paddingBottom: 110,
  },

  section: {
    paddingHorizontal: 20,
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#9F1239",
    marginBottom: 14,
  },

  horizontal: {
    gap: 12,
    paddingRight: 20,
  },

  phaseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FCE7F3",
  },
  phaseTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#881337",
  },
  phaseText: {
    fontSize: 14,
    color: "#475569",
    marginVertical: 10,
  },
  phaseButton: {
    alignSelf: "flex-start",
    backgroundColor: "#E11D48",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 18,
  },
  phaseButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  article: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#FCE7F3",
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
    fontWeight: "700",
    color: "#881337",
  },
  articleExcerpt: {
    fontSize: 14,
    color: "#475569",
    marginVertical: 8,
    lineHeight: 20,
  },
  readMore: {
    color: "#E11D48",
    fontWeight: "600",
  },
});
