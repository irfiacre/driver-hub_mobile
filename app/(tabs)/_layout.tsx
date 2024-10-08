import { Tabs } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  MaterialCommunityIcons,
  FontAwesome6,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { PRIMARY_COLOR } from "@/constants/fixtures";
import {
  findDocEntryByField,
  subscribeToDocument,
} from "@/services/firebase/helpers";
import { APPLICATIONS_COLLECTION } from "@/constants/collectionNames";
import isAuth from "@/components/isAuth";
import { AddRecordToDB, findDBrecord } from "@/services/database/helpers";
import { AppContext } from "@/context";

const TabLayout = ({ user }: { user: any }) => {
  const [application, setApplication] = useState<any>({});
  const [showTraining, setShowTraining] = useState(false);
  const { _, updateContextState, resetContext } = useContext<any>(AppContext);

  useEffect(() => {
    (async () => {
      if (application.applicant) {
        await AddRecordToDB("application", application);
        updateContextState({ application, user });
      }
    })();
  }, [application]);

  const handleOnUpdateData = (newChanges: any) => {
    setApplication(newChanges);
    setShowTraining(newChanges.status === "approved");
  };

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

    return () =>
      subscribeToDocument(
        APPLICATIONS_COLLECTION,
        handleOnUpdateData,
        application.id
      );
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
        name="training/index"
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
        name="messages/index"
        options={{
          title: "Chat",
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
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="training/[id]"
        options={{ tabBarButton: (props) => null }}
      />
      <Tabs.Screen
        name="messages/[id]"
        options={{ tabBarButton: (props) => null }}
      />
    </Tabs>
  );
};

export default isAuth(TabLayout);
