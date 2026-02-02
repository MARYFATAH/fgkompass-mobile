import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { client } from "../sanity/client";

export default function ArticleScreen() {
  const { slug } = useLocalSearchParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type=="post" && slug.current==$slug][0]{
          title,
          publishedAt,
          "imageUrl": image.asset->url,
          body
        }`,
        { slug },
      )
      .then(setPost)
      .catch(console.error);
  }, [slug]);

  if (!post) {
    return (
      <View style={styles.center}>
        <Text>Loading…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
      )}

      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.date}>
        {new Date(post.publishedAt).toDateString()}
      </Text>

      <Text style={styles.body}>
        {post.body?.[0]?.children?.[0]?.text ?? ""}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#9D174D",
    marginBottom: 8,
  },
  date: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 24,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
