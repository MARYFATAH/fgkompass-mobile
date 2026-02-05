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
  },

  item: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  activeItem: {
    backgroundColor: "#FFF1F2",
    borderColor: "#9F1239",
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },

  activeLabel: {
    color: "#9F1239",
    fontWeight: "600",
  },
});
