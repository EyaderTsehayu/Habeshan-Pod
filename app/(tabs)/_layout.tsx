import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.headerText,
        tabBarLabelStyle: {
          fontFamily: "dm-sb",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="createPodcast"
        options={{
          tabBarLabel: "Create",

          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="mic" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mypodcast"
        options={{
          tabBarLabel: "My Podcast",

          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="podcast" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mysubscription"
        options={{
          tabBarLabel: "My Subscription",

          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="subscriptions" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",

          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
