import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  StyledButton,
  StyledImage,
  StyledText,
  StyledView,
} from "@/components/StyledComponents";
import BaseInput from "@/components/BaseInput";
import { PLACEHOLDER_IMG } from "@/constants/fixtures";

interface FormState {
  nationalId: string;
  driverLicenseId: string;
}

const BaseScreen = () => {
  const [state, setState] = useState<FormState>({
    nationalId: "",
    driverLicenseId: "",
  });
  const [error, setError] = useState<string | null>(null);
  const handleInputChange = (identifier: string, value: string) => {
    setState((prevState: any) => ({
      ...prevState,
      [identifier]: value,
    }));
    setError(null);
  };
  const handleSubmitBaseInfo = () => {
    console.log(state);
  };
  const profileImg = PLACEHOLDER_IMG;

  return (
    <StyledView>
      <StyledView className="flex flex-row items-center gap-10">
        <StyledImage
          source={{
            uri: profileImg,
            width: 152,
            height: 142,
          }}
          className="rounded-lg"
        />
        <StyledView className="px-8">
          <StyledText className="text-textLightColor text-base font-poppinsRegular">
            Upload Passport Photo
          </StyledText>
          <StyledText className="text-borderColorLight text-sm font-poppinsRegular py-4">
            * Size 2MB, Clear, Colored
          </StyledText>
        </StyledView>
      </StyledView>
      <StyledView>
        <BaseInput
          label="National ID"
          value={state.nationalId}
          onChangeText={handleInputChange}
          identifier="nationalId"
          placeholder="Enter number written on national ID"
        />
        <BaseInput
          label="Driver License ID"
          value={state.nationalId}
          onChangeText={handleInputChange}
          identifier="driverLicenseId"
          placeholder="Enter number written on Driver License"
        />
      </StyledView>
      <StyledView>
        <StyledButton
          className="w-full px-10 py-4 bg-primary rounded-xl text-center"
          onPress={handleSubmitBaseInfo}
        >
          <StyledText className="text-white text-lg text-center font-poppinsMedium">
            Continue
          </StyledText>
        </StyledButton>
      </StyledView>
    </StyledView>
  );
};

export default BaseScreen;
