import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LifePhaseArticleCard from "../../../components/LifePhaseArticleCard";
import LifePhaseWheel from "../../../components/LifePhaseWheel";
import { client } from "../../../sanity/client";

export default function LifePhaseScreen() {
  const [phases, setPhases] = useState([]);
  const [activePhase, setActivePhase] = useState(null);
  const [posts, setPosts] = useState([]);

  // 1️⃣ Fetch life phases from Sanity
  useEffect(() => {
    client
      .fetch(
        `
        *[_type=="lifePhase"] | order(order asc){
          _id,
          title,
          "slug": slug.current
        }
      `,
      )
      .then((data) => {
        const mapped = data.map((p) => ({
          id: p._id,
          label: p.title,
          slug: p.slug,
        }));

        setPhases(mapped);
        setActivePhase(mapped[0]); // default
      });
  }, []);

  // 2️⃣ Fetch posts for selected life phase
  useEffect(() => {
    if (!activePhase?.slug) return;

    client
      .fetch(
        `
  *[
    _type=="post" &&
    defined(slug.current) &&
    $slug in lifePhases[]->slug.current
  ] | order(publishedAt desc){
    _id,
    title,
    excerpt,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url
  }
  `,
        { slug: activePhase.slug },
      )
      .then(setPosts);
  }, [activePhase]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Life Phases</Text>

      <LifePhaseWheel phases={phases} onSelect={setActivePhase} />

      <View style={styles.content}>
        <Text style={styles.phaseTitle}>{activePhase?.label}</Text>

        {posts.length === 0 && (
          <Text style={styles.empty}>No articles yet</Text>
        )}

        {posts.map((p) => (
          <LifePhaseArticleCard
            key={p._id}
            title={p.title}
            excerpt={p.excerpt}
            imageUrl={p.imageUrl}
            slug={p.slug}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1F2",
  },

  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#881337",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 12,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  phaseTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#9F1239",
    marginBottom: 16,
  },

  empty: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 8,
  },
});
