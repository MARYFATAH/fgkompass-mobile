import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useTranslation } from "react-i18next";

import { BRAND_CARD, BRAND_COLORS } from "../constants/theme";

/**
 * MinimalCard - elegant uniform-height category card (native)
 */
export default function MinimalCard({
  title,
  description,
  icon: Icon,
  imageSource,
  link,
}) {
  const router = useRouter();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const cardWidth = Math.max(150, Math.min(220, Math.round(width * 0.52)));

  const cardContent = (
    <View style={[styles.card, { width: cardWidth }]}>
      {imageSource ? <Image source={imageSource} style={styles.image} /> : null}

      <View style={styles.body}>
        <View style={styles.header}>
          {Icon && (
            <View style={styles.iconWrap}>
              <Icon size={22} color={BRAND_COLORS.primary} />
            </View>
          )}
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>

        <View style={styles.descriptionWrap}>
          {description ? (
            <Text style={styles.description} numberOfLines={3}>
              {description}
            </Text>
          ) : null}
        </View>

        <Text style={styles.explore}>{`${t("common.explore")} ->`}</Text>
      </View>
    </View>
  );

  if (!link) return cardContent;

  return (
    <Pressable
      onPress={() => router.push(link)}
      style={({ pressed }) => [
        styles.pressable,
        { width: cardWidth },
        pressed && styles.pressed,
      ]}
    >
      {cardContent}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {},
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  card: {
    ...BRAND_CARD,
    borderRadius: 18,
    padding: 14,
    height: 214,
  },
  body: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 84,
    borderRadius: 12,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    minHeight: 44,
  },
  iconWrap: {
    padding: 7,
    borderRadius: 12,
    backgroundColor: BRAND_COLORS.primarySoft,
    borderWidth: 1,
    borderColor: BRAND_COLORS.border,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: BRAND_COLORS.title,
    flexShrink: 1,
    lineHeight: 22,
  },
  description: {
    fontSize: 13,
    color: BRAND_COLORS.textMuted,
    lineHeight: 18,
    marginTop: 2,
  },
  descriptionWrap: {
    minHeight: 54,
  },
  explore: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "700",
    color: BRAND_COLORS.primary,
    letterSpacing: 0.2,
  },
});
