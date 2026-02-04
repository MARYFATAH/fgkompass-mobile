import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LifePhaseWheel from "../../../components/LifePhaseWheel";
import MinimalCard from "../../../components/MinimalCard";
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
        setActivePhase(mapped[0]); // default selection
      });
  }, []);

  // 2️⃣ Fetch posts based on selected life phase
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
          title
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
          <Text style={{ color: "#9CA3AF" }}>No articles yet</Text>
        )}

        {posts.map((p) => (
          <MinimalCard key={p._id} title={p.title} link={`/posts/${p.slug}`} />
        ))}
      </View>
    </ScrollView>
  );
}
export const styles = StyleSheet.create({
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

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#FBCFE8",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  cardText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
});
