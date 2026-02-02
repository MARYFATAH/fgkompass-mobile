import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MinimalCard from "../../components/MinimalCard";
import MoreOnTopic from "../../components/MoreOnTopic";
import { client } from "../../sanity/client";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `*[
      _type == "post" &&
      featured == true &&
      defined(slug.current)
    ] | order(publishedAt desc)[0...6] {
      _id,
      title,
      slug,
      "imageUrl": image.asset->url,
      excerpt
    }`;

    client
      .fetch(query)
      .then(setFeatured)
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <LinearGradient
      colors={["#ffe4e6", "#fecdd3", "#fda4af"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* 🌸 HERO */}
        <View style={styles.hero}>
          <Image
            source={require("../../assets/strongwomen.jpg")}
            style={styles.heroImage}
          />
          <Text style={styles.heroTitle}>Strong women. Strong futures.</Text>
          <Text style={styles.heroSubtitle}>
            Knowledge, health & life guidance
          </Text>
        </View>

        {/* 🌿 EXPLORE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore</Text>

          <View style={styles.stack}>
            <MinimalCard
              title="Nutrition"
              description="Food, balance & wellbeing"
              link="/nutrition"
            />
            <MinimalCard
              title="Mental Health"
              description="Emotional wellbeing & resilience"
              link="/mental-health"
            />
            <MinimalCard
              title="Fitness"
              description="Exercise & physical activity"
              link="/fitness"
            />
            <MinimalCard
              title="Motherhood"
              description="Life phase & parenting support"
              link="/life-phase/motherhood"
            />
          </View>
        </View>

        {/* 💡 MORE ON TOPIC */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More on this topic</Text>
          <MoreOnTopic />
        </View>

        {/* 📰 FEATURED ARTICLES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Articles</Text>

          {error && <Text style={styles.error}>{error}</Text>}

          {featured.map((post) => (
            <View key={post._id} style={styles.articleCard}>
              <Image
                source={{ uri: post.imageUrl }}
                style={styles.articleImage}
              />

              <View style={styles.articleBody}>
                <Text style={styles.articleTitle}>{post.title}</Text>
                <Text style={styles.articleExcerpt} numberOfLines={3}>
                  {post.excerpt}
                </Text>

                <Link href={`/${post.slug.current}`} asChild>
                  <Pressable style={styles.readButton}>
                    <Text style={styles.readButtonText}>Read more</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* 🎨 STYLES */

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },

  /* HERO */
  hero: {
    alignItems: "center",
    marginBottom: 56,
  },
  heroImage: {
    width: "100%",
    height: 230,
    borderRadius: 22,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "#881337",
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 15,
    color: "#475569",
    marginTop: 10,
    textAlign: "center",
    maxWidth: 280,
  },

  /* SECTIONS */
  section: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#9f1239",
    marginBottom: 18,
    letterSpacing: 0.3,
  },

  /* EXPLORE STACK */
  stack: {
    gap: 18,
  },

  /* ARTICLES */
  articleCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  articleImage: {
    width: "100%",
    height: 190,
  },
  articleBody: {
    padding: 18,
  },
  articleTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#881337",
    marginBottom: 10,
  },
  articleExcerpt: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },

  /* BUTTON */
  readButton: {
    marginTop: 14,
    backgroundColor: "#f43f5e",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,
    alignSelf: "flex-start",
  },
  readButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  error: {
    color: "red",
    marginBottom: 10,
  },
});
