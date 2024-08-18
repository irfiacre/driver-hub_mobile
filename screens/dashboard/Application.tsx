import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  StyledButton,
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components/StyledComponents";
import UserTopComponent from "@/components/UserTopComponent";
import BaseCard from "@/components/cards/BaseCard";
import { router } from "expo-router";
import { RECOMMENDED_COURSES_COLLECTION } from "@/constants/collectionNames";
import { getCollectionEntries } from "@/services/firebase/helpers";
import { FlatList } from "react-native";
import WiderCourseCard from "@/components/cards/WiderCourseCard";

const Application = ({ applicationData }: { applicationData: any }) => {
  const finishedCourses = applicationData.onboardingPlan.courses.filter(
    (elt: any) => elt.completed
  );

  const [recommendedCourses, setRecommendedCourses] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const result = await getCollectionEntries(RECOMMENDED_COURSES_COLLECTION);

      setRecommendedCourses(result);
    })();
  }, []);

  return (
    <StyledScrollView className="h-full">
      <UserTopComponent data={applicationData} />
      <StyledView className="px-6 py-10">
        <StyledText className="text-textDarkColor text-xl font-poppinsMedium p-4">
          Statistics
        </StyledText>
        <BaseCard>
          <StyledView className="flex flex-row justify-between items-center py-2">
            <StyledText className="text-textDarkColor text-base font-poppinsMedium">
              Unfinished Courses
            </StyledText>
            <StyledText className="text-textDarkColor text-base font-poppinsMedium pr-4">
              {applicationData.onboardingPlan.totalCourses -
                finishedCourses.length}
            </StyledText>
          </StyledView>
          <StyledView className="flex flex-row justify-between items-center py-2">
            <StyledText className="text-textDarkColor text-base font-poppinsMedium">
              Finished Courses
            </StyledText>
            <StyledText className="text-textDarkColor text-base font-poppinsMedium pr-4">
              {finishedCourses.length}
            </StyledText>
          </StyledView>
        </BaseCard>
      </StyledView>
      <StyledView>
        <StyledText className="text-xl font-poppinsBold text-textDarkColor p-4">
          Recommended Courses:
        </StyledText>
        <StyledView>
          <FlatList
            data={recommendedCourses}
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
    </StyledScrollView>
  );
};

export default Application;
