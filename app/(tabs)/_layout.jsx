import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // 🔤 Tab title on the left
        headerTitleAlign: "left",

        // 🌸 Logo on the right
        headerRight: () => (
          <Image
            source={require("../../assets/images/fgkompass-logo.png")}
            style={{
              width: 70,
              height: 70,
              resizeMode: "contain",
              marginRight: 12,
              backgroundColor: "#fff",
              marginBottom: 15,
              borderRadius: 80,
            }}
          />
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
          height: 58,
          paddingTop: 6,
          paddingBottom: 6,
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
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="life-phase"
        options={{
          title: "Life Phase",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="aboutUs"
        options={{
          title: "About Us",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
