import { ImageBackground, useWindowDimensions } from "react-native";
import React from "react";
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

const MaterialScreen = ({
  material,
  course,
  handleCompleted,
}: {
  material: any;
  course: any;
  handleCompleted: (data: any) => void;
}) => {
  const { width } = useWindowDimensions();
  const handleMarkCompleted = async () => {
    console.log("To update application courses");

    // await updateDoc();
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
      <StyledView className="px-4 opacity-100">
        <StyledText className="text-white font-poppinsBold text-2xl py-2.5">
          {material.title}
        </StyledText>
      </StyledView>
      <ScrollViewCard className=" space-y-5 h-full">
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
                html: material.notes,
              }}
            />
          </StyledView>
        </StyledView>

        <StyledView className="w-full flex flex-row justify-between gap-2 items-start py-3.5">
          <StyledTouchableOpacity
            className=" w-full px-10 py-4 bg-primary rounded-xl text-center"
            onPress={handleMarkCompleted}
          >
            <StyledText className="text-white text-lg text-center font-poppinsMedium">
              Complete
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </ScrollViewCard>
    </ImageBackground>
  );
};

export default MaterialScreen;
