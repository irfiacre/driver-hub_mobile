import { View, Text, StatusBar, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { APPLICATIONS_COLLECTION } from "@/constants/collectionNames";
import { findDocEntryByField } from "@/services/firebase/helpers";
import isAuth from "@/components/isAuth";
import {
  StyledButton,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components/StyledComponents";
import TopCourseCard from "@/components/cards/TopCourseCard";
import { AppContext } from "@/context";
import WiderCourseCard from "@/components/cards/WiderCourseCard";
import { useRouter } from "expo-router";

const training = () => {
  const { contextState, _, resetContext } = useContext<any>(AppContext);
  const router = useRouter();
  const unfinishedCourses =
    contextState.application.onboardingPlan.courses.filter(
      (course: any) => course.completed === false
    );

  return (
    <StyledView className="bg-white h-full px-2">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <StyledView>
        <StyledText className="text-xl font-poppinsBold text-textDarkColor py-2.5">
          Resume Courses:
        </StyledText>
        <StyledView>
          <FlatList
            horizontal
            data={unfinishedCourses}
            renderItem={({ item }) => (
              <StyledView>
                <TopCourseCard course={item} />
              </StyledView>
            )}
            keyExtractor={(item) => item.title}
          />
        </StyledView>
      </StyledView>
      <StyledView>
        <StyledText className="text-xl font-poppinsBold text-textDarkColor py-2.5">
          My Onboarding Courses:
        </StyledText>
        <StyledView>
          <FlatList
            data={contextState.application.onboardingPlan.courses}
            renderItem={({ item }) => (
              <StyledTouchableOpacity
                className="px-5 my-1 mx-4 w-full"
                onPress={() => router.navigate(`/training/${item.id}`)}
              >
                <WiderCourseCard course={item} />
              </StyledTouchableOpacity>
            )}
            keyExtractor={(item) => item.title}
          />
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default training;
