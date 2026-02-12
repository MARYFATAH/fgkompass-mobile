import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LifePhaseArticleCard from "../../../components/LifePhaseArticleCard";
import LifePhaseWheel from "../../../components/LifePhaseWheel";
import { client } from "../../../sanity/client";
import { useTranslation } from "react-i18next";

export default function LifePhaseScreen() {
  const [phases, setPhases] = useState([]);
  const [activePhaseId, setActivePhaseId] = useState(null);
  const [posts, setPosts] = useState([]);
  const { t } = useTranslation();

  const PHASE_ORDER = ["young", "motherhood", "midlife", "older"];
  const PHASE_LABELS = {
    young: t("lifePhase.youth"),
    motherhood: t("lifePhase.family"),
    midlife: t("lifePhase.midlife"),
    older: t("lifePhase.older"),
  };
  const PHASE_LABELS_BY_TITLE = {
    youth: t("lifePhase.youth"),
    "family & relationships": t("lifePhase.family"),
    motherhood: t("lifePhase.family"),
    midlife: t("lifePhase.midlife"),
    "old age": t("lifePhase.older"),
    "older adulthood": t("lifePhase.older"),
    "older adult wellness": t("lifePhase.older"),
  };

  // 1️⃣ Fetch life phases from Sanity
  useEffect(() => {
    client
      .fetch(
        `
        *[_type=="lifePhase"] | order(order asc){
          _id,
          title,
          image,
          "slug": slug.current
        }
      `,
      )
      .then((data) => {
        const mapped = data.map((p) => ({
          id: p._id,
          title: p.title,
          slug: p.slug,
        }));

        const seen = new Set();
        const deduped = [];

        mapped.forEach((p) => {
          const key = (p.slug || p.title || p.id || "")
            .toString()
            .toLowerCase()
            .trim();

          if (!key || seen.has(key)) return;
          seen.add(key);
          deduped.push(p);
        });

        const getIndex = (slug, title) => {
          const idx = PHASE_ORDER.indexOf(slug);
          if (idx !== -1) return idx;
          const normalizedTitle = title?.toLowerCase?.();
          const titleOrder = ["youth", "family & relationships", "midlife", "old age", "older adulthood", "older adult wellness"];
          const tIdx = titleOrder.indexOf(normalizedTitle);
          if (tIdx !== -1) return Math.min(tIdx, PHASE_ORDER.length - 1);
          return idx === -1 ? PHASE_ORDER.length : idx;
        };

        const sorted = deduped.sort(
          (a, b) => getIndex(a.slug, a.title) - getIndex(b.slug, b.title),
        );

        setPhases(sorted);
        setActivePhaseId(sorted[0]?.id || null); // default
      });
  }, []);

  const displayPhases = phases.map((p) => ({
    ...p,
    label:
      PHASE_LABELS[p.slug] ||
      PHASE_LABELS_BY_TITLE[p.title?.toLowerCase?.()] ||
      p.title,
  }));

  const activePhase = displayPhases.find((p) => p.id === activePhaseId) || null;

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
     image,
     "imageAspectRatio": image.asset->metadata.dimensions.aspectRatio,
  }
  `,
        { slug: activePhase.slug },
      )
      .then(setPosts);
  }, [activePhase?.slug]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      stickyHeaderIndices={[1]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t("lifePhase.title")}</Text>
        <Text style={styles.subtitle}>{t("lifePhase.subtitle")}</Text>
      </View>

      <View style={styles.stickyWrap}>
        <View style={styles.wheelWrap}>
          <LifePhaseWheel
            phases={displayPhases}
            activePhase={activePhase}
            onSelect={(phase) => setActivePhaseId(phase.id)}
          />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.phaseTitle}>{activePhase?.label}</Text>
        <View style={styles.divider} />
      </View>

      {posts.length === 0 && (
        <Text style={styles.empty}>{t("lifePhase.empty")}</Text>
      )}

      {posts.map((p) => (
        <LifePhaseArticleCard
          key={p._id}
          title={p.title}
          excerpt={p.excerpt}
          image={p.image}
          imageAspectRatio={p.imageAspectRatio}
          slug={p.slug}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#9F1239",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },

  wheelWrap: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#FCE7F3",
    paddingVertical: 6,
    marginBottom: 22,
  },
  stickyWrap: {
    backgroundColor: "#FFFFFF",
    paddingTop: 4,
    paddingBottom: 10,
  },

  sectionHeader: {
    marginBottom: 10,
  },

  phaseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#881337",
  },

  divider: {
    height: 1,
    backgroundColor: "#FCE7F3",
    marginTop: 12,
  },

  empty: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 8,
  },
});
