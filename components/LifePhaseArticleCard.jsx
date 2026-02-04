import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function LifePhaseArticleCard({
  title,
  excerpt,
  imageUrl,
  slug,
}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/${slug}`)}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
    >
      {/* IMAGE */}
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
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

        <Text style={styles.readMore}>Read article →</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FBCFE8",
    elevation: 2,
  },

  image: {
    width: "100%",
    height: 160, // 🔴 REQUIRED
    backgroundColor: "#FDE8EF",
  },

  imagePlaceholder: {
    height: 160,
    backgroundColor: "#FCE7F3",
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 6,
  },

  excerpt: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4B5563",
    marginBottom: 10,
  },

  readMore: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9F1239",
  },
});
