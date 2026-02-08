import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import LifePhaseArticleCard from "../../../components/LifePhaseArticleCard";
import { client } from "../../../sanity/client";

export default function ExploreGroup() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const [group, setGroup] = useState(null);
  const [subtopics, setSubtopics] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!slug) return;

    client
      .fetch(
        `*[_type=="topic" && slug.current==$slug][0]{
          _id,
          title,
          "slug": slug.current,
          "subtopics": *[_type=="topic" && parent._ref==^._id] | order(order asc, title asc){
            _id,
            title,
            "slug": slug.current
          }
        }`,
        { slug },
      )
      .then((data) => {
        setGroup({ _id: data?._id, title: data?.title, slug: data?.slug });
        setSubtopics(data?.subtopics || []);
      })
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    if (!group?._id) return;

    const ids = subtopics.length ? subtopics.map((s) => s._id) : [group._id];

    client
      .fetch(
        `*[
          _type=="post" &&
          defined(slug.current) &&
          references($ids)
        ] | order(publishedAt desc){
          _id,
          title,
          excerpt,
          "imageUrl": image.asset->url,
          slug,
          "topicIds": topics[]._ref
        }`,
        { ids },
      )
      .then(setPosts)
      .catch(console.error);
  }, [group?._id, subtopics]);

  const postsBySubtopic = useMemo(() => {
    const map = new Map();
    subtopics.forEach((s) => map.set(s._id, []));
    posts.forEach((p) => {
      p.topicIds?.forEach((id) => {
        if (map.has(id)) map.get(id).push(p);
      });
    });
    return map;
  }, [posts, subtopics]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>&lt;- Back</Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.title}>{group?.title}</Text>
        <Text style={styles.subtitle}>{t("home.sectionMore")}</Text>
      </View>

      {subtopics.length === 0 ? (
        <View>
          {posts.map((p) => (
            <LifePhaseArticleCard
              key={p._id}
              title={p.title}
              excerpt={p.excerpt}
              imageUrl={p.imageUrl}
              slug={p.slug.current}
            />
          ))}
        </View>
      ) : (
        subtopics.map((sub) => (
          <View key={sub._id} style={styles.subgroup}>
            <Text style={styles.subgroupTitle}>{sub.title}</Text>
            {(postsBySubtopic.get(sub._id) || []).map((p) => (
              <LifePhaseArticleCard
                key={p._id}
                title={p.title}
                excerpt={p.excerpt}
                imageUrl={p.imageUrl}
                slug={p.slug.current}
              />
            ))}
          </View>
        ))
      )}
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
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#9F1239",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },
  subgroup: {
    marginBottom: 24,
  },
  subgroupTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#881337",
    marginBottom: 12,
  },
});
