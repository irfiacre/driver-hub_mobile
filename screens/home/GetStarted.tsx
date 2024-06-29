import { StyleSheet, Text } from "react-native";
import React from "react";
import {
  StyledButton,
  StyledImage,
  StyledText,
  StyledView,
} from "@/components/StyledComponents";

const GetStarted = () => {
  return (
    <StyledView>
      <StyledView className="pt-20 pb-36 items-end">
        <StyledText className="text-base text-center text-textLightColor">
          Skip
        </StyledText>
      </StyledView>
      <StyledImage
        source={require("../../assets/images/get_started.png")}
        className="w-60 h-60"
      />
      <StyledView className="pt-16">
        <StyledText className="text-2xl font-bold text-center pb-16">
          Get Started Now!
        </StyledText>
        <StyledView className="flex flex-row justify-center gap-2 items-start">
          <StyledView className="h-1.5 w-2.5 bg-menuIconBackground rounded-full"></StyledView>
          <StyledView className="h-1.5 w-2.5 bg-menuIconBackground rounded-full"></StyledView>
          <StyledView className="h-1.5 w-7 bg-primary rounded-full"></StyledView>
        </StyledView>
      </StyledView>
      <StyledView className="pt-16 flex flex-row justify-between gap-2 items-start">
        <StyledButton className="px-10 py-3 bg-primary rounded-xl text-center">
          <StyledText className="text-white text-base font-medium text-center">
            Sign up
          </StyledText>
        </StyledButton>
        <StyledButton className="px-10 py-3 border border-primary rounded-xl text-base text-center">
          <StyledText className="text-primary text-base font-medium text-center">
            Login
          </StyledText>
        </StyledButton>
      </StyledView>
    </StyledView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({});
