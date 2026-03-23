import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { PanResponder, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { client } from "../sanity/client";
import { buildImageUrl } from "../sanity/imageUrl";
import { BRAND_CARD, BRAND_COLORS } from "../constants/theme";

const ROTATE_EVERY_MS = 10000;
const SWIPE_THRESHOLD = 50;

export default function KeinGeheimtipp() {
  const router = useRouter();
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSecretTips() {
      try {
        const topicQuery = `*[
          _type == "topic" &&
          (
            lower(title) match "*geheimtipp*" ||
            lower(slug.current) match "*geheimtipp*"
          )
        ]{
          _id,
          title,
          "slug": slug.current
        }`;

        const matchedTopics = await client.fetch(topicQuery);
        const topicIds = (matchedTopics || []).map((topic) => topic._id);

        if (!topicIds.length) {
          setPosts([]);
          return;
        }

        const postQuery = `*[
          _type == "post" &&
          defined(slug.current) &&
          count(topics[@._ref in $topicIds]) > 0
        ] | order(publishedAt desc){
          _id,
          title,
          excerpt,
          slug,
          image,
          "imageAspectRatio": image.asset->metadata.dimensions.aspectRatio
        }`;

        const data = await client.fetch(postQuery, { topicIds });
        setPosts(data || []);
        setActiveIndex(0);
      } catch (err) {
        setError(err?.message || "Unknown error");
      }
    }

    fetchSecretTips();
  }, []);

  useEffect(() => {
    if (posts.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % posts.length);
    }, ROTATE_EVERY_MS);
    return () => clearInterval(timer);
  }, [posts]);

  const activePost = useMemo(() => {
    if (!posts.length) return null;
    return posts[activeIndex];
  }, [posts, activeIndex]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 14 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderRelease: (_, gestureState) => {
          if (posts.length <= 1) return;

          if (gestureState.dx <= -SWIPE_THRESHOLD) {
            setActiveIndex((prev) => (prev + 1) % posts.length);
            return;
          }

          if (gestureState.dx >= SWIPE_THRESHOLD) {
            setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);
          }
        },
      }),
    [posts.length],
  );

  if (error) {
    return (
      <View style={styles.card}>
        <Text style={styles.message}>{error}</Text>
      </View>
    );
  }

  if (!activePost) {
    return (
      <View style={styles.card}>
        <Text style={styles.message}>{t("home.noSecretTips")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.card} {...panResponder.panHandlers}>
      {activePost.image ? (
        <Image
          source={{ uri: buildImageUrl(activePost.image, { width: 1200 }) }}
          style={[
            styles.image,
            { aspectRatio: activePost.imageAspectRatio || 16 / 9 },
          ]}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.imageFallback]} />
      )}

      <Text style={styles.title}>{activePost.title}</Text>
      <Text style={styles.excerpt} numberOfLines={3}>
        {activePost.excerpt || t("home.secretTipFallback")}
      </Text>

      <View style={styles.controlsRow}>
        <View style={styles.dots}>
          {posts.map((post, idx) => (
            <View
              key={post._id}
              style={[styles.dot, idx === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      </View>

      <Pressable
        onPress={() =>
          router.push({
            pathname: "/[slug]",
            params: { slug: activePost.slug.current },
          })
        }
      >
        <Text style={styles.readMore}>{t("common.readMore")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...BRAND_CARD,
    borderRadius: 18,
    overflow: "hidden",
    padding: 16,
  },
  image: {
    width: "100%",
    borderRadius: 14,
    backgroundColor: BRAND_COLORS.surfaceStrong,
    marginBottom: 14,
  },
  imageFallback: {
    height: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: BRAND_COLORS.title,
    lineHeight: 24,
  },
  excerpt: {
    fontSize: 13,
    color: BRAND_COLORS.textMuted,
    marginTop: 8,
    marginBottom: 12,
    lineHeight: 19,
  },
  controlsRow: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 99,
    backgroundColor: BRAND_COLORS.borderStrong,
    opacity: 0.45,
  },
  dotActive: {
    opacity: 1,
    backgroundColor: BRAND_COLORS.primaryStrong,
  },
  readMore: {
    color: BRAND_COLORS.primaryStrong,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  message: {
    fontSize: 14,
    color: BRAND_COLORS.textMuted,
  },
});
