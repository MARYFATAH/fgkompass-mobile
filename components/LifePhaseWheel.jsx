import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { BRAND_CARD, BRAND_COLORS } from "../constants/theme";

export default function LifePhaseLine({ phases = [], activePhase, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {phases.map((phase) => {
        const isActive = activePhase?.id === phase.id;

        return (
          <Pressable
            key={phase.id}
            onPress={() => onSelect(phase)}
            style={[styles.item, isActive && styles.activeItem]}
          >
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {phase.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: BRAND_COLORS.surfaceMuted,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BRAND_COLORS.border,
  },

  item: {
    ...BRAND_CARD,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 16,
    backgroundColor: BRAND_COLORS.surface,
    borderWidth: 1,
    borderColor: BRAND_COLORS.border,
  },

  activeItem: {
    backgroundColor: BRAND_COLORS.primarySoft,
    borderColor: BRAND_COLORS.primaryStrong,
    transform: [{ scale: 1.02 }],
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: BRAND_COLORS.textMuted,
    letterSpacing: 0.2,
  },

  activeLabel: {
    color: BRAND_COLORS.primary,
    fontWeight: "700",
  },
});
