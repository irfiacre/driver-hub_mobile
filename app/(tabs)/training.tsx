import { View, Text, StatusBar, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { APPLICATIONS_COLLECTION } from "@/constants/collectionNames";
import { findDocEntryByField } from "@/services/firebase/helpers";
import isAuth from "@/components/isAuth";
import { StyledText, StyledView } from "@/components/StyledComponents";
import TopCourseCard from "@/components/cards/TopCourseCard";
import { AppContext } from "@/context";
import WiderCourseCard from "@/components/cards/WiderCourseCard";

const training = () => {
  // const [application, setApplication] = useState<any>({});
  const { contextState, _ } = useContext<any>(AppContext);

  // useEffect(() => {
  //   (async () => {
  //     const applicationData = await findDocEntryByField(
  //       APPLICATIONS_COLLECTION,
  //       "applicant.userId",
  //       user.userId
  //     );
  //     if (applicationData) {
  //       setApplication(applicationData);
  //     }
  //   })();
  // }, []);

  return (
    <StyledView className="bg-white h-full px-2">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <StyledView>
        <StyledText className="text-xl font-poppinsBold text-textDarkColor py-5">
          Resume Courses:
        </StyledText>
        <StyledView>
          <FlatList
            horizontal
            data={contextState.application.onboardingPlan.courses}
            renderItem={({ item }) => <TopCourseCard course={item} />}
            keyExtractor={(item) => item.title}
          />
        </StyledView>
      </StyledView>
      <StyledView>
        <StyledText className="text-xl font-poppinsBold text-textDarkColor py-5">
          My Onboarding Courses:
        </StyledText>
        <StyledView>
          <FlatList
            data={contextState.application.onboardingPlan.courses}
            renderItem={({ item }) => <WiderCourseCard course={item} />}
            keyExtractor={(item) => item.title}
          />
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default training;
