import { View, Text, ScrollView } from "react-native";
import React from "react";
import {
  StyledButton,
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
} from "@/components/StyledComponents";
import LogoComponent from "@/components/logo/LogoComponent";
import UserTopComponent from "@/components/UserTopComponent";
import BaseCard from "@/components/cards/BaseCard";

const Application = ({ applicationData }: { applicationData: any }) => {
  console.log("----------", applicationData);

  return (
    <StyledScrollView className="h-full">
      <UserTopComponent data={applicationData} />
      <StyledView className="px-2 py-10">
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
                applicationData.onboardingPlan.finishedCourses}
            </StyledText>
          </StyledView>
          <StyledView className="flex flex-row justify-between items-center py-2">
            <StyledText className="text-textDarkColor text-base font-poppinsMedium">
              Finished Courses
            </StyledText>
            <StyledText className="text-textDarkColor text-base font-poppinsMedium pr-4">
              {applicationData.onboardingPlan.finishedCourses}
            </StyledText>
          </StyledView>
        </BaseCard>
      </StyledView>

      <StyledView className="py-4 px-2">
        <StyledButton
          className="px-4 w-full flex flex-row justify-between items-center py-3.5 bg-backgroundColor3 rounded-xl"
          // onPress={()=> }
        >
          <StyledView className="w-3/4">
            <StyledText className="text-2xl font-poppinsMedium">
              Continue onboarding
            </StyledText>
            <StyledText className="text-base font-poppinsMedium text-modalBackground">
              Taking remaining Trainings
            </StyledText>
          </StyledView>
          <StyledView>
            <StyledImage
              source={require("../../assets/images/onboarding1.png")}
              className="w-24 h-24"
            />
          </StyledView>
        </StyledButton>
      </StyledView>
    </StyledScrollView>
  );
};

export default Application;
