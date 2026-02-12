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
              pressed && { backgroundColor: "#FFF1F2" },
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
              <Text style={styles.subtitle}>{t("common.readMore")}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 16,
    marginTop: 24,
  },
  grid: {
    gap: 16,
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#fff",
  },
  image: {
    width: 80,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
  },
});
