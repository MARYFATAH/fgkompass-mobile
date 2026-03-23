export const BRAND_COLORS = {
  pageBase: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceMuted: "#FCF8FA",
  surfaceSoft: "#F9F1F5",
  surfaceStrong: "#F6E8EE",
  border: "#EEDDE5",
  borderStrong: "#D8B5C4",
  text: "#312733",
  textMuted: "#685D68",
  textSoft: "#8D7E88",
  title: "#881337",
  primary: "#9C2248",
  primaryStrong: "#B8325B",
  primarySoft: "#F8EAF0",
  accent: "#C85C83",
  success: "#15803D",
  danger: "#B91C1C",
  white: "#FFFFFF",
  shadow: "#53263A",
  tabInactive: "#A78B9A",
};

export const BRAND_GRADIENTS = {
  page: ["#FFFFFF", "#FFFFFF"],
  heroOverlay: ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.98)"],
};

export const BRAND_SHADOW = {
  shadowColor: BRAND_COLORS.shadow,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.03,
  shadowRadius: 10,
  elevation: 1,
};

export const BRAND_CARD = {
  backgroundColor: BRAND_COLORS.surface,
  borderWidth: 1,
  borderColor: BRAND_COLORS.border,
  ...BRAND_SHADOW,
};
