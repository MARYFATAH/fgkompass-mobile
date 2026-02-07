import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

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
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
  },

  item: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFF7FB",
    borderWidth: 1,
    borderColor: "#F3E8FF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  activeItem: {
    backgroundColor: "#FDF2F8",
    borderColor: "#BE185D",
    transform: [{ scale: 1.02 }],
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    letterSpacing: 0.2,
  },

  activeLabel: {
    color: "#9F1239",
    fontWeight: "700",
  },
});
