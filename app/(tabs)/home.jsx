import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolate,
  FadeIn,
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MinimalCard from "../../components/MinimalCard";
import MoreOnTopic from "../../components/MoreOnTopic";
import KeinGeheimtipp from "../../components/KeinGeheimtipp";
import BrandScreen from "../../components/BrandScreen";
import { BRAND_CARD, BRAND_COLORS, BRAND_GRADIENTS } from "../../constants/theme";
import { client } from "../../sanity/client";
import { buildImageUrl } from "../../sanity/imageUrl";

const HERO_HEIGHT = 280;
const DEFAULT_TOPIC_IMAGE = require("../../assets/strongwomen.jpg");
const TOPIC_IMAGES = {
  "hormone-overview-and-regulation": require("../../assets/images/hormone.jpg"),
  "immune-system-in-women": require("../../assets/images/immune-system.jpg"),
  "pain-processing-in-women": require("../../assets/images/pain.jpg"),
  "metabolism-in-women": require("../../assets/images/metabolism.jpg"),
  "disease-risks-in-women": require("../../assets/images/disease.jpg"),
  "menstrual-cycle-and-its-impact": require("../../assets/images/menstrual.jpg"),
  breastcancer: require("../../assets/images/breast-cancer.jpg"),
  wellness: require("../../assets/strongwomen.jpg"),
  menopause: require("../../assets/images/menopause.jpg"),
  pregnancy: require("../../assets/images/pregnancy.jpg"),
  "breast-cancer": require("../../assets/images/breast-cancer.jpg"),
  diabetes: require("../../assets/images/diabetes.jpg"),
  diabet: require("../../assets/images/diabetes.jpg"),
  diabets: require("../../assets/images/diabetes.jpg"),
  "heart-disease": require("../../assets/images/heart-disease.jpg"),
};

export default function Home() {
  const scrollY = useSharedValue(0);
  const [featured, setFeatured] = useState([]);
  const [topics, setTopics] = useState([]);
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const sectionPadding = Math.max(16, Math.min(24, Math.round(width * 0.05)));

  useEffect(() => {
    const query = `*[
      _type == "post" &&
      featured == true &&
      defined(slug.current)
    ][0...5]{
      _id,
      title,
      excerpt,
      image,
      "imageAspectRatio": image.asset->metadata.dimensions.aspectRatio,
      slug
    }`;

    client.fetch(query).then(setFeatured);
  }, []);

  useEffect(() => {
    console.log("Sanity config:", {
      projectId: process.env.EXPO_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.EXPO_PUBLIC_SANITY_DATASET,
      useCdn: process.env.EXPO_PUBLIC_SANITY_USE_CDN,
      apiVersion: process.env.EXPO_PUBLIC_SANITY_API_VERSION,
    });
    client
      .fetch(
        `*[_type=="topic"] | order(order asc, title asc){
          _id,
          title,
          "slug": slug.current,
          parent
        }`,
      )
      .then((data) => {
        const topLevel = data.filter((item) => !item.parent);
        console.log(
          "Topic slugs:",
          topLevel.map((t) => t.slug),
        );
        const missingImages = topLevel
          .map((t) => (t.slug || "").toString().trim().toLowerCase())
          .filter((slug) => slug && !TOPIC_IMAGES[slug]);
        if (missingImages.length) {
          console.log("Missing topic images for:", missingImages);
        }
        setTopics(topLevel);
      })
      .catch(console.error);
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
    <BrandScreen>
      {/* HERO */}
      <Animated.View style={[styles.hero, heroStyle]}>
        <Animated.Image
          source={require("../../assets/images/brave-women.png")}
          style={[styles.heroImage, heroImageStyle]}
        />
        <LinearGradient
          colors={BRAND_GRADIENTS.heroOverlay}
          style={styles.heroOverlay}
        />
        <Animated.View
          entering={FadeInDown.duration(700)}
          style={[styles.heroText, heroTextStyle]}
        >
          <Text style={[styles.heroTitle, { fontSize: width < 360 ? 22 : 26 }]}>
            {t("home.heroTitle")}
          </Text>
          <Text style={styles.heroSubtitle}>{t("home.heroSubtitle")}</Text>
        </Animated.View>
      </Animated.View>

      {/* CONTENT */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 100 + insets.bottom + 12 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Section title={t("home.sectionExplore")} sectionPadding={sectionPadding}>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.horizontal, { paddingRight: sectionPadding }]}
          >
            {topics.map((topic) => (
              <MinimalCard
                key={topic._id}
                title={t(`topics.${topic.slug}`, topic.title)}
                link={`/explore/${topic.slug}`}
                imageSource={
                  TOPIC_IMAGES[(topic.slug || "").toLowerCase()] ||
                  DEFAULT_TOPIC_IMAGE
                }
              />
            ))}
          </Animated.ScrollView>
        </Section>

        <Section title={t("home.sectionSecretTip")} sectionPadding={sectionPadding}>
          <KeinGeheimtipp />
        </Section>

        <Section title={t("home.sectionMore")} sectionPadding={sectionPadding}>
          <MoreOnTopic />
        </Section>

        <Section title={t("home.sectionFeatured")} sectionPadding={sectionPadding}>
          {featured.map((post) => (
            <Animated.View key={post._id} entering={FadeIn.duration(500)}>
              <View style={styles.article}>
                {post.image ? (
                  <Image
                    source={{
                      uri: buildImageUrl(post.image, { width: 1000 }),
                    }}
                    style={[
                      styles.articleImage,
                      { aspectRatio: post.imageAspectRatio || 16 / 9 },
                    ]}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.articleImage} />
                )}
                <View style={styles.articleBody}>
                  <Text style={styles.articleTitle}>{post.title}</Text>
                  <Text style={styles.articleExcerpt} numberOfLines={3}>
                    {post.excerpt}
                  </Text>
                  <Link
                    href={{ pathname: "/[slug]", params: { slug: post.slug.current } }}
                    asChild
                  >
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
    </BrandScreen>
  );
}

const Section = ({ title, children, sectionPadding }) => (
  <View style={[styles.section, { paddingHorizontal: sectionPadding }]}>
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BRAND_COLORS.pageBase,
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
    right: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.84)",
    maxWidth: 560,
    alignSelf: "center",
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: BRAND_COLORS.title,
    lineHeight: 34,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 14,
    color: BRAND_COLORS.textMuted,
    marginTop: 8,
    lineHeight: 21,
    textAlign: "center",
  },

  content: {
    paddingTop: HERO_HEIGHT + 24,
  },

  section: {
    marginBottom: 32,
  },
  sectionHeading: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: BRAND_COLORS.title,
    letterSpacing: 0.2,
  },

  horizontal: {
    gap: 12,
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
    ...BRAND_CARD,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
  },
  articleImage: {
    width: "100%",
    backgroundColor: BRAND_COLORS.surfaceStrong,
  },
  articleBody: {
    padding: 15,
  },
  articleTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: BRAND_COLORS.title,
    lineHeight: 23,
  },
  articleExcerpt: {
    fontSize: 13,
    color: BRAND_COLORS.textMuted,
    marginVertical: 8,
    lineHeight: 19,
  },
  readMore: {
    color: BRAND_COLORS.primaryStrong,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
});



