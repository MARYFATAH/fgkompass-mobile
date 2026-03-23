import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import BrandScreen from "../../components/BrandScreen";
import { BRAND_CARD, BRAND_COLORS } from "../../constants/theme";

export default function About() {
  const { t } = useTranslation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const contentMaxWidth = Math.min(920, width - 24);

  return (
    <BrandScreen>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, styles.contentCentered]}
      >
        <View style={[styles.inner, { maxWidth: contentMaxWidth }]}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.title}>{t("about.title")}</Text>
          <Text style={styles.subtitle}>{t("about.subtitle")}</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Text section */}
          <View style={styles.textBlock}>
            <Section
              title={t("about.missionTitle")}
              text={t("about.missionText")}
            />

            <Section
              title={t("about.whyTitle")}
              text={t("about.whyText")}
            />

            <Section
              title={t("about.valuesTitle")}
              bullets={[
                t("about.values1"),
                t("about.values2"),
                t("about.values3"),
              ]}
            />
          </View>

          {/* Image */}
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.divider} />

        {/* CTA */}
        <View style={styles.cta}>
          <Text style={styles.ctaText}>{t("about.ctaText")}</Text>
          <Pressable onPress={() => router.push("/(tabs)/contact")}>
            <Text style={styles.ctaLink}>{t("about.ctaLink")}</Text>
          </Pressable>
        </View>
        </View>
      </ScrollView>
    </BrandScreen>
  );
}

/* ---------- Small helper component ---------- */

function Section({ title, text, bullets }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {text && <Text style={styles.sectionText}>{text}</Text>}
      {bullets &&
        bullets.map((item, index) => (
          <Text key={index} style={styles.bullet}>
            • {item}
          </Text>
        ))}
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  contentCentered: {
    alignItems: "center",
  },
  inner: {
    width: "100%",
  },

  hero: {
    marginTop: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: BRAND_COLORS.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: BRAND_COLORS.textMuted,
    lineHeight: 22,
    textAlign: "left",
  },

  card: {
    ...BRAND_CARD,
    borderRadius: 20,
    padding: 18,
    gap: 20,
  },

  textBlock: {
    gap: 20,
  },

  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: BRAND_COLORS.primary,
  },
  sectionText: {
    fontSize: 14,
    color: BRAND_COLORS.textMuted,
    lineHeight: 22,
    textAlign: "left",
  },
  bullet: {
    fontSize: 14,
    color: BRAND_COLORS.textMuted,
    lineHeight: 22,
    textAlign: "left",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 20,
  },

  divider: {
    height: 1,
    backgroundColor: BRAND_COLORS.border,
    marginTop: 28,
  },

  cta: {
    marginTop: 24,
    alignItems: "center",
    gap: 8,
  },
  ctaText: {
    fontSize: 16,
    color: BRAND_COLORS.textMuted,
  },
  ctaLink: {
    fontSize: 16,
    fontWeight: "500",
    color: BRAND_COLORS.primaryStrong,
  },
});
