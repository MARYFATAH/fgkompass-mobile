import { useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 120;
const SPACING = 16;

export default function LifePhaseWheel({ phases, onSelect }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.wrapper}>
      <Animated.FlatList
        data={phases}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.list}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / (ITEM_WIDTH + SPACING),
          );
          onSelect(phases[index]);
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (ITEM_WIDTH + SPACING),
            index * (ITEM_WIDTH + SPACING),
            (index + 1) * (ITEM_WIDTH + SPACING),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1.1, 0.85],
            extrapolate: "clamp",
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [25, 0, 25],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[styles.item, { transform: [{ scale }, { translateY }] }]}
            >
              <Text style={styles.label}>{item.label}</Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    height: 140,
    justifyContent: "center",
  },
  list: {
    paddingHorizontal: (width - ITEM_WIDTH) / 2,
  },
  item: {
    width: ITEM_WIDTH,
    height: 70,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING / 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#881337",
    textAlign: "center",
  },
});
