import { StyleSheet, View } from "react-native";

import { BRAND_COLORS } from "../constants/theme";

export default function BrandScreen({ children, style, contentStyle }) {
  return (
    <View style={[styles.root, style]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BRAND_COLORS.pageBase,
  },
  content: {
    flex: 1,
  },
});
