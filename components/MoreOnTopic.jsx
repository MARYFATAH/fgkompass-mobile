import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { client } from "../sanity/client";
import { buildImageUrl } from "../sanity/imageUrl";
import { useTranslation } from "react-i18next";
import { BRAND_CARD, BRAND_COLORS } from "../constants/theme";

export default function MoreOnTopic() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  const isTablet = width >= 768;

  useEffect(() => {
    client
      .fetch(
        `*[_type=="post" && defined(slug.current)][0...4]{
          _id,
          title,
          excerpt,
          slug,
          image,
          "imageAspectRatio": image.asset->metadata.dimensions.aspectRatio
        }`,
      )
      .then(setPosts)
      .catch(console.error);
  }, []);

  if (!posts.length) return null;

  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.grid, { flexDirection: isTablet ? "row" : "column" }]}
      >
        {posts.map((post) => (
          <Pressable
            key={post._id}
            onPress={() =>
              router.push({
                pathname: "/[slug]",
                params: { slug: post.slug.current },
              })
            }
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
              isTablet && { width: "48%" },
            ]}
          >
            {post.image ? (
              <Image
                source={{
                  uri: buildImageUrl(post.image, { width: 300 }),
                }}
                style={[
                  styles.image,
                  { aspectRatio: post.imageAspectRatio || 1 },
                ]}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.image} />
            )}

            <View style={styles.textWrap}>
              <Text style={styles.title} numberOfLines={2}>
                {post.title}
              </Text>
              <Text style={styles.subtitle} numberOfLines={2}>
                {post.excerpt || t("common.readMore")}
              </Text>
              <Text style={styles.linkText}>{t("common.readMore")}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 12,
  },
  grid: {
    gap: 12,
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 15,
    borderRadius: 14,
    ...BRAND_CARD,
  },
  cardPressed: {
    backgroundColor: BRAND_COLORS.surfaceSoft,
  },
  image: {
    width: 72,
    borderRadius: 12,
    backgroundColor: BRAND_COLORS.surfaceStrong,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: BRAND_COLORS.title,
    lineHeight: 21,
  },
  subtitle: {
    fontSize: 13,
    color: BRAND_COLORS.textMuted,
    marginTop: 5,
    lineHeight: 18,
  },
  linkText: {
    fontSize: 12,
    fontWeight: "700",
    color: BRAND_COLORS.primary,
    marginTop: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
