import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // 🌸 Logo stays on the left
        headerLeft: () => (
          <Image
            source={require("../../assets/images/fgkompass-logo.png")}
            style={{
              width: 70,
              height: 70,
              resizeMode: "contain",
              marginLeft: 12,
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

        // 🎨 Brand-compatible back button color
        headerTintColor: "#881337",

        tabBarActiveTintColor: "#f43f5e",
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
