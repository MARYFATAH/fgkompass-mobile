import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import LanguageToggle from "../components/LanguageToggle";
import AuthButton from "../components/AuthButton";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Onboarding() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const isGerman = i18n.language === "de";
  const slides = isGerman
    ? [
        {
          key: "step1",
          title: "Warum es diese App gibt",
          body:
            "Frauen sind keine kleineren Maenner mit Gebaermutter. Sie haben eine eigene Physiologie, eigene Symptome und eigene Beduerfnisse. Doch noch immer wird Frauengesundheit zu oft uebersehen, zu spaet erkannt und zu wenig erforscht. Die App Women's Health Knowledge Compass setzt genau hier an: Sie macht Wissen zugaenglich, staerkt Selbstfuersorge und begleitet Frauen durch alle Lebensphasen von Zyklus und Schwangerschaft bis zu Wechseljahren und mentaler Belastung.",
        },
        {
          key: "step2",
          title: "Ein Raum fuer Empowerment",
          body:
            "Diese App ist mehr als ein Tool. Sie ist ein Raum fuer Aufklaerung, Austausch und Aktivierung. Sie hilft Frauen, ihren Koerper besser zu verstehen, Symptome fruehzeitig zu deuten und individuelle Strategien fuer Gesundheit im Alltag zu entwickeln. Dabei geht es nicht um Defizite, sondern um Potenziale: koerperlich, emotional und sozial.",
        },
        {
          key: "step3",
          title: "Dein Kompass",
          body:
            "Mit fundierten Informationen, praktischen Impulsen und einem staerkenorientierten Blick auf Frauengesundheit schafft der Compass Orientierung. Lebensnah, wertschaetzend und empowernd. Fuer Frauen, die sich selbst ernst nehmen. Und fuer eine Medizin, die Frauen endlich mitdenkt.",
        },
      ]
    : [
        {
          key: "step1",
          title: "Why This App Exists",
          body:
            "Women are not smaller men with a uterus. They have their own physiology, their own symptoms, and their own needs. Yet women's health is still too often overlooked, recognized too late, and under-researched. The Women's Health Knowledge Compass app addresses this very issue: it makes knowledge accessible, strengthens self-care, and supports women through all phases of life from menstruation and pregnancy to menopause and mental stress.",
        },
        {
          key: "step2",
          title: "A Space for Empowerment",
          body:
            "This app is more than just a tool. It is a space for education, exchange, and empowerment. It helps women better understand their bodies, recognize symptoms early, and develop individual strategies for everyday health. It is not about deficits, but about potential: physical, emotional, and social.",
        },
        {
          key: "step3",
          title: "Your Compass",
          body:
            "With sound information, practical advice, and a strengths-based approach to women's health, Compass provides guidance that is practical, respectful, and empowering. For women who take themselves seriously. And for a medical system that finally considers women's needs.",
        },
      ];

  const goTo = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= slides.length) return;
    setIndex(nextIndex);
  };

  const onNext = () => {
    if (index === slides.length - 1) {
      router.replace("/(tabs)/home");
      return;
    }
    goTo(index + 1);
  };

  const activeSlide = slides[index];

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF"]}
      style={styles.root}
    >
      <View style={styles.toggleWrap}>
        <AuthButton />
        <LanguageToggle />
      </View>

      <Animated.View style={styles.blobLeft} />
      <Animated.View style={styles.blobRight} />

      <View style={styles.header}>
        <Text style={styles.title}>{t("onboarding.title")}</Text>
      </View>

      <View style={[styles.slide, { width }]}>
        <Animated.View
          key={activeSlide.key}
          style={styles.card}
          entering={FadeInUp.duration(500)}
        >
          <Text style={styles.cardTitle}>{activeSlide.title}</Text>
          <Text style={styles.cardBody}>{activeSlide.body}</Text>
        </Animated.View>
      </View>

      <View
        style={styles.controls}
      >
        <Pressable
          onPress={() => router.replace("/(tabs)/home")}
          style={styles.skip}
        >
          <Text style={styles.skipText}>{t("onboarding.skip")}</Text>
        </Pressable>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={`dot-${i}`}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>

        <Pressable onPress={onNext} style={styles.button}>
          <Text style={styles.buttonText}>
            {index === slides.length - 1
              ? t("onboarding.cta")
              : t("onboarding.next")}
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  toggleWrap: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    top: 44,
    right: 16,
    zIndex: 10,
  },
  blobLeft: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 200,
    backgroundColor: "rgba(255,255,255,0.55)",
    top: -40,
    left: -40,
  },
  blobRight: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 200,
    backgroundColor: "rgba(255,255,255,0.55)",
    bottom: -60,
    right: -30,
  },
  header: {
    paddingTop: 86,
    paddingHorizontal: 20,
    paddingBottom: 12,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#881337",
    textAlign: "left",
  },
  slide: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#9F1239",
    marginBottom: 10,
    textAlign: "left",
  },
  cardBody: {
    fontSize: 16,
    lineHeight: 24,
    color: "#475569",
    textAlign: "left",
  },
  controls: {
    marginTop: "auto",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#FBCFE8",
  },
  dotActive: {
    backgroundColor: "#9F1239",
    width: 18,
  },
  button: {
    backgroundColor: "#9F1239",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  skip: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  skipText: {
    color: "#9F1239",
    fontSize: 14,
    fontWeight: "600",
  },
});
