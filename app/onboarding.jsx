import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import LanguageToggle from "../components/LanguageToggle";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Onboarding() {
  const { t } = useTranslation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);

  const slides = [
    {
      key: "step1",
      title: t("onboarding.step1Title"),
      body: t("onboarding.step1Body"),
    },
    {
      key: "step2",
      title: t("onboarding.step2Title"),
      body: t("onboarding.step2Body"),
    },
    {
      key: "step3",
      title: t("onboarding.step3Title"),
      body: t("onboarding.step3Body"),
    },
  ];

  const goTo = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= slides.length) return;
    listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setIndex(nextIndex);
  };

  const onNext = () => {
    if (index === slides.length - 1) {
      router.replace("/(tabs)/home");
      return;
    }
    goTo(index + 1);
  };

  return (
    <LinearGradient
      colors={["#FFF7FB", "#FDE7F0", "#F9E8FF"]}
      style={styles.root}
    >
      <View style={styles.toggleWrap}>
        <LanguageToggle />
      </View>

      <Animated.View style={styles.blobLeft} />
      <Animated.View style={styles.blobRight} />

      <View style={styles.header}>
        <Text style={styles.title}>{t("onboarding.title")}</Text>
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const nextIndex = Math.round(
            event.nativeEvent.contentOffset.x / width,
          );
          setIndex(nextIndex);
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Animated.View style={styles.card} entering={FadeInUp.duration(500)}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>{item.body}</Text>
            </Animated.View>
          </View>
        )}
      />

      <View style={styles.controls}>
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
