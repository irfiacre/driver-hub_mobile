import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components/StyledComponents";
import BaseCard from "@/components/cards/BaseCard";

const OverviewScreen = ({
  course,
  handleShowMaterial,
}: {
  course: any;
  handleShowMaterial: (data: any) => void;
}) => {
  return (
    <ImageBackground
      source={{ uri: course.thumbnail.url }}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <StyledView className="px-4 opacity-100">
        <StyledText className="text-white font-poppinsBold text-2xl py-2.5">
          {course.title}
        </StyledText>
      </StyledView>
      <BaseCard className=" space-y-5 h-full">
        <StyledView className="px-4">
          <StyledText className="text-textDarkColor font-poppinsBold text-lg py-2.5">
            Description
          </StyledText>
          <StyledText className="text-textLightColor font-poppinsRegular text-base">
            {course.description}
          </StyledText>
        </StyledView>

        <StyledView className="px-4 flex flex-row justify-between items-center">
          <StyledText className="text-borderColorLight font-poppinsRegular text-sm">
            {"Duration: 2 hours"}
          </StyledText>
          <StyledText className="text-borderColorLight font-poppinsRegular text-sm">
            Last Update:{" "}
            {`${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`}
          </StyledText>
        </StyledView>

        <StyledView className="px-4">
          <StyledText className="text-textDarkColor font-poppinsBold text-lg py-2.5">
            Content
          </StyledText>
          <StyledView className="text-textLightColor font-poppinsRegular text-base">
            {course.materials.map((material: any, index: any) => (
              <StyledTouchableOpacity
                onPress={() => handleShowMaterial(material)}
                className="w-full px-2 py-2 flex flex-row justify-start items-center gap-5"
                key={index}
              >
                <StyledText className="text-borderColorLight font-poppinsMedium text-2xl">
                  0{index + 1}
                </StyledText>
                <StyledText className="text-textDarkColor font-poppinsRegular text-base">
                  {material.title}
                </StyledText>
              </StyledTouchableOpacity>
            ))}
          </StyledView>
        </StyledView>

        <StyledView className="w-full flex flex-row justify-between gap-2 items-start py-3.5">
          <StyledTouchableOpacity
            className=" w-full px-10 py-4 bg-primary rounded-xl text-center"
            onPress={() => console.log("send some message")}
          >
            <StyledText className="text-white text-lg text-center font-poppinsMedium">
              Provide Feedback
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </BaseCard>
    </ImageBackground>
  );
};

export default OverviewScreen;
