import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, View, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LanguageToggle from "../../components/LanguageToggle";

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
                backgroundColor: "#fff",
                borderRadius: logoSize / 2,
              }}
            />
          </View>
        ),

        // 🎨 Brand-compatible background color
        headerStyle: {
          backgroundColor: "#fdf2f8",
        },

        headerTitleStyle: {
          fontSize: 17,
          fontWeight: "600",
          color: "#881337",
        },

        // 🎨 Brand-compatible back button color
        headerTintColor: "#881337",

        tabBarStyle: {
          height: 58 + insets.bottom,
          paddingTop: 6,
          paddingBottom: Math.max(6, insets.bottom),
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F1F5F9",
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },

        tabBarActiveTintColor: "#9F1239",
        tabBarInactiveTintColor: "#94A3B8",
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
        name="contact"
        options={{
          title: label("tabs.contact", "Contact"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call" size={size} color={color} />
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

    </Tabs>
  );
}
