import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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

      {/* CTA */}
      <View style={styles.cta}>
        <Text style={styles.ctaText}>{t("about.ctaText")}</Text>
        <Text style={styles.ctaLink}>{t("about.ctaLink")}</Text>
      </View>
    </ScrollView>
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
    backgroundColor: "#FFF",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  hero: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#E11D48", // rose-600
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 340,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    gap: 24,
    borderWidth: 1,
    borderColor: "#FCE7F3",
  },

  textBlock: {
    gap: 20,
  },

  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#F43F5E",
  },
  sectionText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  bullet: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 20,
  },

  cta: {
    marginTop: 50,
    alignItems: "center",
    gap: 8,
  },
  ctaText: {
    fontSize: 16,
    color: "#475569",
  },
  ctaLink: {
    fontSize: 16,
    fontWeight: "500",
    color: "#E11D48",
  },
});
