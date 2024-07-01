import { StyleSheet } from "react-native";
import React from "react";
import {
  StyledImage,
  StyledText,
  StyledView,
} from "@/components/StyledComponents";

const QuicEasy = () => {
  return (
    <StyledView>
      <StyledView className="pt-20 pb-36 items-end">
        <StyledText className="text-base text-center text-textLightColor font-poppinsRegular">
          Skip
        </StyledText>
      </StyledView>
      <StyledImage
        source={require("../../assets/images/illustration_2.png")}
        className="w-60 h-60"
      />
      <StyledView className="pt-16">
        <StyledText className="text-2xl text-center pb-10 font-poppinsBold">
          Quick and easy!
        </StyledText>
        <StyledText className="text-base text-center font-poppinsRegular text-textLightColor">
          Quick to Register and Easy to use
        </StyledText>
      </StyledView>
      <StyledView className="pt-16 flex flex-row justify-center gap-2 items-start">
        <StyledView className="h-1.5 w-2.5 bg-menuIconBackground rounded-full"></StyledView>
        <StyledView className="h-1.5 w-7 bg-primary rounded-full"></StyledView>
        <StyledView className="h-1.5 w-2.5 bg-menuIconBackground rounded-full"></StyledView>
      </StyledView>
    </StyledView>
  );
};

export default QuicEasy;

const styles = StyleSheet.create({});
