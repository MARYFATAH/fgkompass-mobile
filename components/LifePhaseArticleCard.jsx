import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { buildImageUrl } from "../sanity/imageUrl";
import { BRAND_CARD, BRAND_COLORS } from "../constants/theme";

export default function LifePhaseArticleCard({
  title,
  excerpt,
  image,
  imageAspectRatio,
  slug,
}) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/[slug]",
          params: { slug },
        })
      }
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
    >
      {/* IMAGE */}
      {image ? (
        <Image
          source={{
            uri: buildImageUrl(image, { width: 900 }),
          }}
          style={[styles.image, { aspectRatio: imageAspectRatio || 16 / 9 }]}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {excerpt ? (
          <Text style={styles.excerpt} numberOfLines={3}>
            {excerpt}
          </Text>
        ) : null}

        <Text style={styles.readMore}>{t("common.readMore")}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    ...BRAND_CARD,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    backgroundColor: BRAND_COLORS.surfaceStrong,
  },

  imagePlaceholder: {
    height: 160,
    backgroundColor: BRAND_COLORS.primarySoft,
  },

  content: {
    padding: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: BRAND_COLORS.title,
    marginBottom: 5,
    lineHeight: 22,
  },

  excerpt: {
    fontSize: 13,
    lineHeight: 19,
    color: BRAND_COLORS.textMuted,
    marginBottom: 10,
  },

  readMore: {
    fontSize: 12,
    fontWeight: "700",
    color: BRAND_COLORS.primary,
    letterSpacing: 0.3,
  },
});
