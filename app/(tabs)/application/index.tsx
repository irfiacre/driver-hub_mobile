import { StatusBar, Alert } from "react-native";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { StyledView } from "@/components/StyledComponents";
import FinalScreen from "@/screens/application/Final";
import BaseScreen from "@/screens/application/Base";
import { findLocalUser } from "@/services/database/helpers";
import {
  APPLICATIONS_COLLECTION,
  DRIVERS_COLLECTION_NAME,
} from "@/constants/collectionNames";
import { createDocEntry, updateDocEntry } from "@/services/firebase/helpers";
import { useRouter } from "expo-router";

const Application = () => {
  const [applicationInfo, setApplicationInfo] = useState<any>({
    baseInformation: null,
    documentInformation: null,
    status: "pending",
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmitBaseInfo = (data: any) =>
    setApplicationInfo((prevState: any) => ({
      ...prevState,
      baseInformation: data,
    }));
  const handleOnSubmitApplication = async (data: any) => {
    setLoading(true);
    const user = await findLocalUser();
    const applicationObj = {
      id: `application-${user.userId}`,
      applicant: user,
      baseInformation: applicationInfo.baseInformation,
      documents: data,
      status: "pending",
      onboardingPlan: {
        courses: [],
        progress: 0,
        finishedCourses: 0,
        totalCourses: 0,
      },
    };
    await updateDocEntry(DRIVERS_COLLECTION_NAME, user.id, {
      ...user,
      photoUrl: applicationInfo.baseInformation?.passportPhotoUrl,
    });
    const applicationSent = await createDocEntry(
      APPLICATIONS_COLLECTION,
      applicationObj
    );
    if (applicationSent) {
      Alert.alert("Success", "Application sent successfully");
      router.push("/");
    }
    setLoading(false);
  };
  return (
    <StyledView className="bg-authBackground h-full px-7 py-10">
      <Spinner visible={loading} />
      <StatusBar backgroundColor="#F0F0F2" barStyle="dark-content" />
      {applicationInfo.baseInformation ? (
        <FinalScreen onSubmitApplication={handleOnSubmitApplication} />
      ) : (
        <BaseScreen onSubmitBaseInformation={handleSubmitBaseInfo} />
      )}
    </StyledView>
  );
};

export default Application;
