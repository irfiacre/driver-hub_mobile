import { StyleSheet } from "react-native";
import React from "react";
import LogoComponent from "@/components/logo/LogoComponent";
import { StyledText, StyledView } from "@/components/StyledComponents";

const Welcome = () => {
  return (
    <StyledView>
      <StyledView className="pt-20 pb-36 items-end">
        <StyledText className="text-base text-center text-textLightColor">
          Skip
        </StyledText>
      </StyledView>
      <LogoComponent />
      <StyledView className="pt-16">
        <StyledText className="text-2xl font-bold text-center pb-10">
          Welcome
        </StyledText>
        <StyledText className="text-base text-center font-normal text-textLightColor">
          Want to make money as a Driver?
        </StyledText>
      </StyledView>
      <StyledView className="pt-16 flex flex-row justify-center gap-2 items-start">
        <StyledView className="h-1.5 w-7 bg-primary rounded-full"></StyledView>
        <StyledView className="h-1.5 w-2.5 bg-menuIconBackground rounded-full"></StyledView>
        <StyledView className="h-1.5 w-2.5 bg-menuIconBackground rounded-full"></StyledView>
      </StyledView>
    </StyledView>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
