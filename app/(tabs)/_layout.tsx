import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  MaterialCommunityIcons,
  FontAwesome6,
  AntDesign,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { PRIMARY_COLOR } from "@/constants/fixtures";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PRIMARY_COLOR,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="home-variant"
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={false ? "training" : "application/index"}
        options={{
          title: false ? "Training" : "Application",
          tabBarIcon: ({ color }) =>
            false ? (
              <FontAwesome6 size={24} name="book" color={color} />
            ) : (
              <FontAwesome name="send" size={24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon
            //   name={focused ? "home" : "home-outline"}
            //   color={color}
            // />
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Message",
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon
            //   name={focused ? "code-slash" : "code-slash-outline"}
            //   color={color}
            // />
            <AntDesign name="message1" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon
            //   name={focused ? "code-slash" : "code-slash-outline"}
            //   color={color}
            // />
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
