import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  StyledButton,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components/StyledComponents";
import {
  findDocEntryByField,
  subscribeToDocument,
} from "@/services/firebase/helpers";
import {
  APPLICATIONS_COLLECTION,
  COURSES_COLLECTION,
} from "@/constants/collectionNames";
import { ImageBackground, StatusBar, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import OverviewScreen from "@/screens/course/Overview";
import MaterialScreen from "@/screens/course/Material";

const CoursePage = () => {
  const { id } = useLocalSearchParams<any>();
  const [course, setCourse] = useState<any>({});
  const [currentScreen, setCurrentScreen] = useState<"overview" | "material">(
    "overview"
  );
  const [selectedMaterial, setSelectedMaterial] = useState<any>({});

  const handleOnUpdateData = (newChanges: any) => {
    setCourse(newChanges);
  };

  useEffect(() => {
    (async () => {
      const courseData = await findDocEntryByField(
        COURSES_COLLECTION,
        "id",
        id.toLocaleString()
      );
      if (courseData) {
        setCourse(courseData);
      }
    })();

    return () =>
      subscribeToDocument(
        COURSES_COLLECTION,
        handleOnUpdateData,
        id.toLocaleString()
      );
  }, []);

  const handleShowMaterial = (material: any) => {
    setSelectedMaterial(material);
    setCurrentScreen("material");
  };
  const handleMaterialCompleted = (material: any) => {
    console.log(material);
  };

  console.log("===--->", selectedMaterial);

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
            />
          )}
        </StyledView>
      )}
    </StyledView>
  );
};

export default CoursePage;
