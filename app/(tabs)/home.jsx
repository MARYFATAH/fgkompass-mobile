import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import MinimalCard from "../../components/MinimalCard";
import MoreOnTopic from "../../components/MoreOnTopic";

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { client } from "../../sanity/client";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `*[_type == "post" && featured == true && defined(slug.current)]
      | order(publishedAt desc)[0...6] {
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
        {/* HERO */}
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

        {/* FEATURED */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Articles</Text>
          {/* EXPLORE */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Explore</Text>

            <View style={styles.grid}>
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
          {/* MORE ON TOPIC */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More on this topic</Text>
            <MoreOnTopic />
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          {featured.map((post) => (
            <View key={post._id} style={styles.card}>
              <Image source={{ uri: post.imageUrl }} style={styles.cardImage} />

              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{post.title}</Text>
                <Text style={styles.cardExcerpt} numberOfLines={3}>
                  {post.excerpt}
                </Text>

                <Link href={`/${post.slug.current}`} asChild>
                  <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Read more</Text>
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
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  hero: {
    alignItems: "center",
    marginBottom: 40,
  },
  heroImage: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#881337",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#475569",
    marginTop: 8,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#9f1239",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardExcerpt: {
    fontSize: 14,
    color: "#475569",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#f43f5e",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 24,
  },
});
