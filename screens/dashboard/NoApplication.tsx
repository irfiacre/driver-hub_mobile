import { View, Text } from "react-native";
import React from "react";
import {
  StyledButton,
  StyledText,
  StyledView,
} from "@/components/StyledComponents";
import TopComponent from "@/components/TopComponent";
import LogoComponent from "@/components/logo/LogoComponent";

const NoApplication = ({
  handleSubmitApplication,
}: {
  handleSubmitApplication: () => void;
}) => {
  return (
    <StyledView>
      <TopComponent />
      <StyledView className="justify-center align-middle items-center">
        <LogoComponent medium />
      </StyledView>
      <StyledView className="px-10 w-full flex flex-row justify-between gap-2 items-start py-3.5">
        <StyledButton
          className="w-full px-10 py-4 bg-primary rounded-xl text-center"
          onPress={handleSubmitApplication}
        >
          <StyledText className="text-white text-lg font-poppinsMedium text-center">
            Submit Application
          </StyledText>
        </StyledButton>
      </StyledView>
    </StyledView>
  );
};

export default NoApplication;
