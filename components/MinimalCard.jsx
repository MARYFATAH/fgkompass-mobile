import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

/**
 * 🌿 MinimalCard — elegant uniform-height category card (native)
 */
export default function MinimalCard({
  title,
  description,
  icon: Icon,
  imageSource,
  link,
}) {
  const router = useRouter();

  const Card = (
    <View style={styles.card}>
      {imageSource ? (
        <Image source={imageSource} style={styles.image} />
      ) : null}
      {/* HEADER */}
      <View style={styles.header}>
        {Icon && (
          <View style={styles.iconWrap}>
            <Icon size={22} color="#374151" />
          </View>
        )}
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>

      {/* DESCRIPTION */}
      {description ? (
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      ) : null}

      {/* FOOTER */}
      <Text style={styles.explore}>Explore →</Text>
    </View>
  );

  if (!link) return Card;

  return (
    <Pressable
      onPress={() => router.push(link)}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      {Card}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  pressable: {
    width: 190,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    minHeight: 120,
    width: 190,
    borderWidth: 1,
    borderColor: "#FCE7F3",
    justifyContent: "space-between",
    elevation: 0,
  },
  image: {
    width: "100%",
    height: 90,
    borderRadius: 14,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  iconWrap: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937",
    flexShrink: 1,
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginTop: 4,
  },
  explore: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
});
