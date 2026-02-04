// app/[slug].jsx

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { PortableText } from "@portabletext/react-native";
import { client } from "../sanity/client";

/* 🎨 Life-phase theme colors */
const LIFE_PHASE_THEME = {
  teens: "#0EA5E9",
  fertility: "#EC4899",
  pregnancy: "#F472B6",
  menopause: "#8B5CF6",
  default: "#9D174D",
};

/* 🧩 Portable Text renderers */
const portableComponents = {
  block: {
    h2: ({ children }) => <Text style={styles.h2}>{children}</Text>,
    normal: ({ children }) => <Text style={styles.paragraph}>{children}</Text>,
    blockquote: ({ children }) => (
      <View style={styles.callout}>
        <Text style={styles.calloutText}>{children}</Text>
      </View>
    ),
  },
  list: {
    bullet: ({ children }) => <View style={styles.list}>{children}</View>,
  },
  listItem: {
    bullet: ({ children }) => <Text style={styles.listItem}>• {children}</Text>,
  },
  marks: {
    strong: ({ children }) => <Text style={styles.bold}>{children}</Text>,
  },
};

export default function ArticleScreen() {
  const { slug } = useLocalSearchParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!slug) return;

    client
      .fetch(
        `*[_type=="post" && slug.current==$slug][0]{
          title,
          publishedAt,
          lifePhase->{
            slug
          },
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

  const themeColor =
    LIFE_PHASE_THEME[post.lifePhase?.slug?.current] || LIFE_PHASE_THEME.default;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 🖼 Hero image */}
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} style={styles.heroImage} />
      )}

      {/* 📰 Title */}
      <Text style={[styles.title, { color: themeColor }]}>{post.title}</Text>

      {/* 📅 Meta */}
      <Text style={styles.meta}>
        {new Date(post.publishedAt).toDateString()} · 5 min read
      </Text>

      <View style={styles.divider} />

      {/* ✍️ Article body */}
      <PortableText value={post.body} components={portableComponents} />
    </ScrollView>
  );
}

/* 🎯 Styles */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 48,
  },

  heroImage: {
    width: "100%",
    height: 260,
    borderRadius: 20,
    marginTop: 16,
    marginBottom: 28,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 40,
    marginBottom: 8,
  },

  meta: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 20,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 28,
  },

  paragraph: {
    fontSize: 17,
    lineHeight: 28,
    color: "#1F2937",
    marginBottom: 18,
  },

  h2: {
    fontSize: 22,
    fontWeight: "700",
    color: "#881337",
    marginTop: 36,
    marginBottom: 12,
  },

  bold: {
    fontWeight: "700",
  },

  list: {
    marginVertical: 12,
    paddingLeft: 6,
  },

  listItem: {
    fontSize: 16,
    lineHeight: 26,
    color: "#374151",
    marginBottom: 8,
  },

  callout: {
    backgroundColor: "#FDF2F8",
    borderLeftWidth: 4,
    borderLeftColor: "#EC4899",
    padding: 16,
    borderRadius: 12,
    marginVertical: 20,
  },

  calloutText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#831843",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
