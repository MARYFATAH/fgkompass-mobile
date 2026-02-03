import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LifePhaseWheel from "../../../components/LifePhaseWheel";
import { client } from "../../../sanity/client";

const LIFE_PHASES = [
  { id: "young", label: "Young" },
  { id: "midlife", label: "Midlife" },
  { id: "motherhood", label: "Motherhood" },
  { id: "older-adults", label: "Older Adults" },
];

export default function LifePhaseScreen() {
  const [activePhase, setActivePhase] = useState(LIFE_PHASES[2]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type=="post" && "${activePhase.id}" in lifePhase[]->slug.current]{
          _id,title
        }`,
      )
      .then(setPosts);
  }, [activePhase]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Life Phases</Text>

      <LifePhaseWheel phases={LIFE_PHASES} onSelect={setActivePhase} />

      <View style={styles.content}>
        <Text style={styles.phaseTitle}>{activePhase.label}</Text>

        {posts.map((p) => (
          <View key={p._id} style={styles.card}>
            <Text style={styles.cardText}>{p.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1F2", // soft rose background
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
