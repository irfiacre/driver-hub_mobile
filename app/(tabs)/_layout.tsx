import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { findDocEntryByField } from "@/services/firebase/helpers";
import { APPLICATIONS_COLLECTION } from "@/constants/collectionNames";
import isAuth from "@/components/isAuth";

const TabLayout = ({ user }: { user: any }) => {
  const [application, setApplication] = useState<any>({});
  const [showTraining, setShowTraining] = useState(false);

  useEffect(() => {
    (async () => {
      const applicationData = await findDocEntryByField(
        APPLICATIONS_COLLECTION,
        "applicant.userId",
        user.userId
      );
      if (applicationData) {
        setApplication(applicationData);
        setShowTraining(applicationData.status === "approved");
      }
    })();
  }, []);

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
        name="training"
        options={
          showTraining
            ? {
                title: "Training",
                tabBarIcon: ({ color }) => (
                  <FontAwesome6 size={24} name="book" color={color} />
                ),
              }
            : {
                tabBarButton: (props) => null,
              }
        }
      />

      <Tabs.Screen
        name="application/index"
        options={
          !showTraining
            ? {
                title: "Application",
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="send" size={24} color={color} />
                ),
              }
            : {
                tabBarButton: (props) => null,
              }
        }
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Message",
          tabBarIcon: ({ color, focused }) => (
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
};

export default isAuth(TabLayout);
