import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  StyledButton,
  StyledText,
  StyledView,
} from "@/components/StyledComponents";
import LogoComponent from "@/components/logo/LogoComponent";
import BaseInput from "@/components/BaseInput";
import DismissKeyboard from "@/components/DismissKeyboard";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  error?: string | null;
}

const SignUp = () => {
  const [state, setState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: null,
  });

  const handleInputChange = (identifier: string, value: string) =>
    setState((prevState: any) => ({
      ...prevState,
      [identifier]: value,
    }));
  return (
    <StyledView className="p-8 bg-authBackground h-full">
      <StatusBar backgroundColor="#F0F0F2" />
      <StyledView className="items-center">
        <LogoComponent medium />
      </StyledView>
      <StyledView>
        <StyledText className="text-2xl font-bold text-left">
          Sign Up
        </StyledText>
        <StyledText className="text-sm font-normal text-borderColorLight py-2.5">
          Enter your details below & free sign up
        </StyledText>
        <DismissKeyboard>
          <StyledView>
            <BaseInput
              label="First Name"
              value={state.firstName}
              onChangeText={handleInputChange}
              identifier="firstName"
            />
            <BaseInput
              label="Last Name"
              value={state.lastName}
              onChangeText={handleInputChange}
              identifier="lastName"
            />
            <BaseInput
              label="Your Email"
              value={state.email}
              onChangeText={handleInputChange}
              identifier="email"
            />
            <BaseInput
              label="Password"
              value={state.password}
              onChangeText={handleInputChange}
            />
          </StyledView>
        </DismissKeyboard>
      </StyledView>
      <StyledView className="w-full flex flex-row justify-between gap-2 items-start py-3.5">
        <StyledButton
          className=" w-full px-10 py-4 bg-primary rounded-xl text-center"
          // onPress={() => onBtnPress("signup")}
        >
          <StyledText className="text-white text-lg font-medium text-center">
            Create account
          </StyledText>
        </StyledButton>
      </StyledView>
    </StyledView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
