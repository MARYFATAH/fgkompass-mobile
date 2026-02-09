// app/[slug].jsx

import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PortableText } from "@portabletext/react-native";
import { client } from "../sanity/client";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../components/LanguageToggle";

const LIFE_PHASE_THEME = {
  teens: "#0EA5E9",
  fertility: "#EC4899",
  pregnancy: "#F472B6",
  menopause: "#8B5CF6",
  default: "#9D174D",
};

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
  const router = useRouter();
  const [post, setPost] = useState(null);
  const { t } = useTranslation();

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
        <Text>{t("common.loading")}</Text>
      </View>
    );
  }

  const themeColor =
    LIFE_PHASE_THEME[post.lifePhase?.slug?.current] || LIFE_PHASE_THEME.default;

  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ title: post?.title || t("common.loading") }} />
      <View style={styles.toggleWrap}>
        <LanguageToggle />
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>&lt;- Back</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("common.browseLifePhases")}</Text>
          <Text style={styles.headerSubtitle}>{t("home.sectionFeatured")}</Text>
        </View>

        <View style={styles.heroCard}>
          {post.imageUrl && (
            <Image source={{ uri: post.imageUrl }} style={styles.heroImage} />
          )}
          <View style={styles.heroBody}>
            <View style={[styles.accentPill, { borderColor: themeColor }]}>
              <Text style={[styles.accentText, { color: themeColor }]}> 
                {t("lifePhase.title")}
              </Text>
            </View>
            <Text style={[styles.title, { color: themeColor }]}>
              {post.title}
            </Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaDate}>
                {new Date(post.publishedAt).toDateString()}
              </Text>
              <View style={styles.metaDot} />
              <Text style={styles.metaRead}>
                {t("article.readTime", { minutes: 5 })}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.articleCard}>
          <PortableText value={post.body} components={portableComponents} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF7FB",
  },
  container: {
    backgroundColor: "#FFF7FB",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 48,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#FCE7F3",
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },
  backText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9F1239",
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 12,
    color: "#9F1239",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.3,
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#881337",
    marginTop: 6,
  },

  heroCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#FCE7F3",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    marginBottom: 18,
  },
  heroImage: {
    width: "100%",
    height: 240,
  },
  heroBody: {
    padding: 16,
  },
  accentPill: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  accentText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 34,
    marginBottom: 10,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaDate: {
    fontSize: 12,
    color: "#6B7280",
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#CBD5F5",
  },
  metaRead: {
    fontSize: 12,
    color: "#6B7280",
  },

  articleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FCE7F3",
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: "#1F2937",
    marginBottom: 16,
  },

  h2: {
    fontSize: 20,
    fontWeight: "700",
    color: "#881337",
    marginTop: 26,
    marginBottom: 10,
  },

  bold: {
    fontWeight: "700",
  },

  list: {
    marginVertical: 12,
    paddingLeft: 6,
  },

  listItem: {
    fontSize: 15,
    lineHeight: 24,
    color: "#374151",
    marginBottom: 8,
  },

  callout: {
    backgroundColor: "#FDF2F8",
    borderLeftWidth: 4,
    borderLeftColor: "#EC4899",
    padding: 14,
    borderRadius: 12,
    marginVertical: 18,
  },

  calloutText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#831843",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleWrap: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
});
