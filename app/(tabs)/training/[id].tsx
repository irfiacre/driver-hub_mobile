import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { StyledView } from "@/components/StyledComponents";
import Spinner from "react-native-loading-spinner-overlay";
import OverviewScreen from "@/screens/course/Overview";
import MaterialScreen from "@/screens/course/Material";
import { AppContext } from "@/context";

const CoursePage = () => {
  const { id } = useLocalSearchParams<any>();
  const [course, setCourse] = useState<any>({});
  const [currentScreen, setCurrentScreen] = useState<"overview" | "material">(
    "overview"
  );
  const [selectedMaterial, setSelectedMaterial] = useState<any>({});
  const { contextState, updateContextState, _ } = useContext<any>(AppContext);

  useEffect(() => {
    const courseData = contextState.application.onboardingPlan.courses.find(
      (course: any) => course.id === id
    );
    if (courseData) {
      setCourse(courseData);
    }
  }, [contextState.application]);

  const handleShowMaterial = (material: any) => {
    setSelectedMaterial(material);
    setCurrentScreen("material");
  };
  const handleMaterialCompleted = (data: any) => {
    updateContextState(data);
  };

  return (
    <StyledView className="h-full bg-white">
      <Spinner visible={!course.id} />
      {course.id && (
        <StyledView className="h-full bg-white">
          {currentScreen === "overview" ? (
            <OverviewScreen
              course={course}
              handleShowMaterial={handleShowMaterial}
            />
          ) : (
            <MaterialScreen
              material={selectedMaterial}
              course={course}
              handleCompleted={handleMaterialCompleted}
              handleBack={() => {
                setCurrentScreen("overview");
                setSelectedMaterial({});
              }}
            />
          )}
        </StyledView>
      )}
    </StyledView>
  );
};

export default CoursePage;
