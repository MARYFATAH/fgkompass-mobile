import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, View, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LanguageToggle from "../../components/LanguageToggle";
import { BRAND_COLORS } from "../../constants/theme";

export default function TabsLayout() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const logoSize = width < 360 ? 44 : 52;
  const label = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  return (
    <Tabs
      screenOptions={{
        // 🔤 Tab title on the left
        headerTitleAlign: "left",

        // 🌸 Logo on the right
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <LanguageToggle />
            <Image
              source={require("../../assets/images/fgkompass-logo.png")}
              style={{
                width: logoSize,
                height: logoSize,
                resizeMode: "contain",
                marginRight: 12,
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: logoSize / 2,
              }}
            />
          </View>
        ),

        // 🎨 Brand-compatible background color
        headerStyle: {
          backgroundColor: BRAND_COLORS.pageBase,
        },

        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "700",
          color: BRAND_COLORS.title,
        },

        // 🎨 Brand-compatible back button color
        headerTintColor: BRAND_COLORS.title,

        tabBarStyle: {
          height: 58 + insets.bottom,
          paddingTop: 6,
          paddingBottom: Math.max(6, insets.bottom),
          backgroundColor: "rgba(255,255,255,0.96)",
          borderTopWidth: 1,
          borderTopColor: BRAND_COLORS.border,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },

        tabBarActiveTintColor: BRAND_COLORS.primary,
        tabBarInactiveTintColor: BRAND_COLORS.tabInactive,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: label("tabs.home", "Home"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="life-phase"
        options={{
          title: label("tabs.lifePhase", "Life Phase"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="aboutUs"
        options={{
          title: label("tabs.about", "About"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: label("tabs.profile", "Profile"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="contact"
        options={{
          href: null,
        }}
      />

    </Tabs>
  );
}
