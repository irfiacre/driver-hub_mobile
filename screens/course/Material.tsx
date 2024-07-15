import { ImageBackground, useWindowDimensions } from "react-native";
import React, { useContext, useState } from "react";
import { WebView } from "react-native-webview";
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components/StyledComponents";
import ScrollViewCard from "@/components/cards/ScrollViewCard";
import RenderHtml from "react-native-render-html";
import MediaViewer from "@/components/MediaViewer";
import { updateDoc } from "firebase/firestore";
import { AppContext } from "@/context";
import { Ionicons } from "@expo/vector-icons";
import BaseCard from "@/components/cards/BaseCard";
import { updateApplication } from "@/services/firebase/helpers";
import Spinner from "react-native-loading-spinner-overlay";

const MaterialScreen = ({
  material,
  course,
  handleCompleted,
  handleBack,
}: {
  material: any;
  course: any;
  handleCompleted: (data: any) => void;
  handleBack: () => void;
}) => {
  const { width } = useWindowDimensions();
  const { contextState, updateContextState, resetContext } =
    useContext<any>(AppContext);
  const [updating, setUpdating] = useState(false);

  const handleMarkCompleted = async () => {
    setUpdating(true);
    const courseIndex =
      contextState.application.onboardingPlan.courses.findIndex(
        (c: any) => c.id === course.id
      );
    const materialIndex = course.materials.findIndex(
      (m: any) => m.title === material.title
    );
    if (courseIndex === -1 || materialIndex === -1) {
      setUpdating(false);
      return;
    }
    const updatedMaterials = [...course.materials];
    updatedMaterials[materialIndex] = {
      ...updatedMaterials[materialIndex],
      completed: true,
    };

    const updatedCourses = [...contextState.application.onboardingPlan.courses];
    updatedCourses[courseIndex] = {
      ...updatedCourses[courseIndex],
      materials: updatedMaterials,
    };
    let completedCounter = 0;
    for (const elt of updatedCourses[courseIndex].materials) {
      if (elt.completed) {
        completedCounter++;
      }
    }
    updatedCourses[courseIndex].completed =
      completedCounter === updatedCourses[courseIndex].materials.length;

    const updatedApplicationObject = {
      ...contextState.application,
      onboardingPlan: {
        ...contextState.application.onboardingPlan,
        courses: updatedCourses,
      },
    };

    const updatedApplication = await updateApplication(
      contextState.application.id,
      updatedApplicationObject
    );

    if (updatedApplication) {
      handleCompleted(updatedApplicationObject);
      setUpdating(false);
      handleBack();
    } else {
      setUpdating(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: course.thumbnail.url }}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <Spinner visible={updating} />
      <StyledView className="px-4 flex flex-row items-center justify-start gap-5">
        <StyledTouchableOpacity
          className=" py-4 rounded-full"
          onPress={handleBack}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </StyledTouchableOpacity>
        <StyledText className="text-white font-poppinsRegular text-2xl py-2.5 flex-shrink">
          {material.title}
        </StyledText>
      </StyledView>
      <BaseCard className="space-y-5 h-full pb-4">
        <ScrollViewCard className="">
          {material.fileMetadata && (
            <StyledView className="px-4">
              <StyledText className="text-textDarkColor font-poppinsBold text-lg py-2.5">
                Media
              </StyledText>
              <StyledView className="text-textLightColor font-poppinsRegular text-base">
                <MediaViewer />
              </StyledView>
            </StyledView>
          )}

          <StyledView className="px-4">
            <StyledText className="text-textDarkColor font-poppinsBold text-lg py-2.5">
              Content
            </StyledText>
            <StyledView className="px-2 text-textLightColor font-poppinsRegular text-base">
              <RenderHtml
                contentWidth={width}
                source={{
                  html: `${material.notes} ${material.notes}`,
                }}
              />
            </StyledView>
          </StyledView>

          <StyledTouchableOpacity
            className=" w-full px-4 py-4 bg-primary rounded-xl text-center"
            onPress={handleMarkCompleted}
          >
            <StyledText className="text-white text-lg text-center font-poppinsMedium">
              Complete
            </StyledText>
          </StyledTouchableOpacity>
        </ScrollViewCard>
      </BaseCard>
    </ImageBackground>
  );
};

export default MaterialScreen;
