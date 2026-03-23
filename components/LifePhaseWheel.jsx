import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { BRAND_COLORS, BRAND_SHADOW } from "../constants/theme";

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
    paddingHorizontal: 4,
    paddingVertical: 6,
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },

  item: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: BRAND_COLORS.surfaceMuted,
    ...BRAND_SHADOW,
  },

  activeItem: {
    backgroundColor: BRAND_COLORS.primarySoft,
    transform: [{ scale: 1.02 }],
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: BRAND_COLORS.textMuted,
    letterSpacing: 0.2,
  },

  activeLabel: {
    color: BRAND_COLORS.primary,
    fontWeight: "700",
  },
});
