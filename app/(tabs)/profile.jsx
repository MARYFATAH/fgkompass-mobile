import { useClerk, useUser } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

import BrandScreen from "../../components/BrandScreen";
import { BRAND_CARD, BRAND_COLORS } from "../../constants/theme";
import { client } from "../../sanity/client";

const CURRENT_YEAR = new Date().getFullYear();

const LIFE_PHASES = [
  { id: "youth", labelKey: "lifePhase.youth" },
  { id: "family", labelKey: "lifePhase.family" },
  { id: "midlife", labelKey: "lifePhase.midlife" },
  { id: "older", labelKey: "lifePhase.older" },
];

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [birthYear, setBirthYear] = useState("1995");
  const [lifePhase, setLifePhase] = useState("family");
  const [healthGoal, setHealthGoal] = useState("");
  const [healthNotes, setHealthNotes] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type=="topic"] | order(order asc, title asc){
          _id,
          title,
          "slug": slug.current,
          parent
        }`,
      )
      .then((data) => {
        const topLevel = (data || []).filter((item) => !item.parent && item.slug);
        setTopics(topLevel);
        setSelectedInterests(topLevel.slice(0, 3).map((item) => item.slug));
      })
      .catch(console.error);
  }, []);

  const age = useMemo(() => {
    const parsed = Number.parseInt(birthYear, 10);
    if (!parsed || parsed < 1930 || parsed > CURRENT_YEAR) {
      return null;
    }
    return CURRENT_YEAR - parsed;
  }, [birthYear]);

  const recommendedTopics = useMemo(
    () => topics.filter((topic) => selectedInterests.includes(topic.slug)).slice(0, 6),
    [selectedInterests, topics],
  );

  const displayName = isSignedIn
    ? user?.fullName || user?.firstName || t("profile.memberFallback")
    : t("profile.guestTitle");

  const emailText = isSignedIn
    ? user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress
    : t("profile.guestText");

  const handlePrimaryAction = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    await signOut();
    router.replace("/");
  };

  const toggleInterest = (slug) => {
    setSelectedInterests((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  };

  return (
    <BrandScreen style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t("profile.title")}</Text>
          <Text style={styles.subtitle}>{t("profile.subtitle")}</Text>
        </View>

        <View style={styles.heroCard}>
          {user?.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(user?.firstName || user?.emailAddresses?.[0]?.emailAddress || "P")
                  .charAt(0)
                  .toUpperCase()}
              </Text>
            </View>
          )}

          <View style={styles.heroBody}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.email}>{emailText}</Text>

            <View style={styles.metaRow}>
              <StatChip
                label={t("profile.age")}
                value={age ? `${age}` : t("profile.unknown")}
              />
              <StatChip
                label={t("profile.lifePhaseLabel")}
                value={t(
                  LIFE_PHASES.find((item) => item.id === lifePhase)?.labelKey || "lifePhase.family",
                )}
              />
            </View>

            <Pressable style={styles.button} onPress={handlePrimaryAction}>
              <Text style={styles.buttonText}>
                {isSignedIn ? t("profile.signOut") : t("profile.signIn")}
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>{t("profile.personalTitle")}</Text>

          <FieldLabel>{t("profile.birthYear")}</FieldLabel>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={birthYear}
            onChangeText={setBirthYear}
            placeholder={t("profile.birthYearPlaceholder")}
            placeholderTextColor={BRAND_COLORS.textSoft}
          />

          <FieldLabel>{t("profile.lifePhaseQuestion")}</FieldLabel>
          <View style={styles.pillRow}>
            {LIFE_PHASES.map((item) => {
              const active = lifePhase === item.id;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => setLifePhase(item.id)}
                  style={[styles.pill, active && styles.pillActive]}
                >
                  <Text style={[styles.pillText, active && styles.pillTextActive]}>
                    {t(item.labelKey)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <FieldLabel>{t("profile.healthGoal")}</FieldLabel>
          <TextInput
            style={styles.input}
            value={healthGoal}
            onChangeText={setHealthGoal}
            placeholder={t("profile.healthGoalPlaceholder")}
            placeholderTextColor={BRAND_COLORS.textSoft}
          />

          <FieldLabel>{t("profile.healthNotes")}</FieldLabel>
          <TextInput
            style={[styles.input, styles.textarea]}
            multiline
            value={healthNotes}
            onChangeText={setHealthNotes}
            placeholder={t("profile.healthNotesPlaceholder")}
            placeholderTextColor={BRAND_COLORS.textSoft}
          />
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>{t("profile.interestsTitle")}</Text>
          <Text style={styles.sectionSubtitle}>{t("profile.interestsSubtitle")}</Text>

          <View style={styles.pillRow}>
            {topics.map((topic) => {
              const active = selectedInterests.includes(topic.slug);
              return (
                <Pressable
                  key={topic._id}
                  onPress={() => toggleInterest(topic.slug)}
                  style={[styles.topicPill, active && styles.topicPillActive]}
                >
                  <Text style={[styles.topicPillText, active && styles.topicPillTextActive]}>
                    {t(`topics.${topic.slug}`, topic.title)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>{t("profile.recommendedTitle")}</Text>
          <Text style={styles.sectionSubtitle}>{t("profile.recommendedSubtitle")}</Text>

          {recommendedTopics.length ? (
            recommendedTopics.map((topic) => (
              <Link
                key={topic._id}
                href={`/explore/${topic.slug}`}
                asChild
              >
                <Pressable style={styles.recommendationCard}>
                  <View>
                    <Text style={styles.recommendationTitle}>
                      {t(`topics.${topic.slug}`, topic.title)}
                    </Text>
                    <Text style={styles.recommendationText}>
                      {t("profile.recommendationHint")}
                    </Text>
                  </View>
                  <Text style={styles.recommendationArrow}>→</Text>
                </Pressable>
              </Link>
            ))
          ) : (
            <Text style={styles.emptyText}>{t("profile.recommendedEmpty")}</Text>
          )}
        </View>
      </ScrollView>
    </BrandScreen>
  );
}

function FieldLabel({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

function StatChip({ label, value }) {
  return (
    <View style={styles.statChip}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BRAND_COLORS.pageBase,
  },
  container: {
    padding: 20,
    paddingBottom: 48,
    gap: 16,
  },
  header: {
    marginTop: 24,
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: BRAND_COLORS.primary,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 22,
    color: BRAND_COLORS.textMuted,
  },
  heroCard: {
    ...BRAND_CARD,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: BRAND_COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: BRAND_COLORS.surfaceStrong,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "800",
    color: BRAND_COLORS.primaryStrong,
  },
  heroBody: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: BRAND_COLORS.title,
  },
  email: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: BRAND_COLORS.textMuted,
  },
  metaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
    flexWrap: "wrap",
  },
  statChip: {
    backgroundColor: BRAND_COLORS.surface,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 110,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    color: BRAND_COLORS.textSoft,
  },
  statValue: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "700",
    color: BRAND_COLORS.title,
  },
  button: {
    alignSelf: "flex-start",
    marginTop: 16,
    backgroundColor: BRAND_COLORS.primaryStrong,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  formCard: {
    ...BRAND_CARD,
    borderRadius: 20,
    padding: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: BRAND_COLORS.title,
  },
  sectionSubtitle: {
    marginTop: 6,
    marginBottom: 14,
    fontSize: 14,
    lineHeight: 21,
    color: BRAND_COLORS.textMuted,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: BRAND_COLORS.textMuted,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.96)",
    borderWidth: 1,
    borderColor: BRAND_COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: BRAND_COLORS.text,
  },
  textarea: {
    minHeight: 96,
    textAlignVertical: "top",
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: BRAND_COLORS.surface,
    borderWidth: 1,
    borderColor: BRAND_COLORS.border,
  },
  pillActive: {
    backgroundColor: BRAND_COLORS.primaryStrong,
    borderColor: BRAND_COLORS.primaryStrong,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "600",
    color: BRAND_COLORS.primary,
  },
  pillTextActive: {
    color: "#fff",
  },
  topicPill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BRAND_COLORS.border,
  },
  topicPillActive: {
    backgroundColor: BRAND_COLORS.primarySoft,
    borderColor: BRAND_COLORS.primary,
  },
  topicPillText: {
    fontSize: 13,
    fontWeight: "600",
    color: BRAND_COLORS.text,
  },
  topicPillTextActive: {
    color: BRAND_COLORS.primaryStrong,
  },
  recommendationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: BRAND_COLORS.border,
    borderRadius: 18,
    padding: 16,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: BRAND_COLORS.title,
  },
  recommendationText: {
    marginTop: 4,
    fontSize: 13,
    color: BRAND_COLORS.textMuted,
  },
  recommendationArrow: {
    fontSize: 22,
    color: BRAND_COLORS.primaryStrong,
    fontWeight: "700",
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: BRAND_COLORS.textMuted,
  },
});
