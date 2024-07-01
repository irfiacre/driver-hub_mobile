import { Keyboard, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  StyledButton,
  StyledText,
  StyledView,
} from "@/components/StyledComponents";
import Spinner from "react-native-loading-spinner-overlay";
import LogoComponent from "@/components/logo/LogoComponent";
import DismissKeyboard from "@/components/DismissKeyboard";
import BaseInput from "@/components/BaseInput";
import { emailValidate, hasEmptyFields } from "@/utils/helpers";
import { signExistingUser } from "@/services/firebase/authentication";

interface FormState {
  email: string;
  password: string;
}

const Login = ({ onSignin }: { onSignin: () => void }) => {
  const [state, setState] = useState<FormState>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleInputChange = (identifier: string, value: string) => {
    setState((prevState: any) => ({
      ...prevState,
      [identifier]: value,
    }));
    setError(null);
  };

  const handleLoginIntoAccount = async () => {
    setLoading(true);
    Keyboard.dismiss();
    if (hasEmptyFields(state)) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    const emailValidation = emailValidate(state.email);
    if (emailValidation !== state.email) {
      setError(emailValidation);
      setLoading(false);
      return;
    }
    const user = await signExistingUser(state.email, state.password);
    if (user.userId) {
      onSignin();
    } else {
      setError(
        user.code.includes("invalid") ? "Invalid Login Credentials" : null
      );
    }
    setLoading(false);
  };
  return (
    <StyledView className="p-8 bg-authBackground h-full">
      <Spinner visible={loading} />
      <StatusBar backgroundColor="#F0F0F2" />
      <StyledView className="items-center">
        <LogoComponent medium />
      </StyledView>
      <StyledView>
        <StyledText className="text-2xl font-poppinsBold text-left pb-5">
          Login
        </StyledText>
        <DismissKeyboard>
          <StyledView>
            <BaseInput
              label="Your Email"
              value={state.email}
              onChangeText={handleInputChange}
              identifier="email"
              placeholder="Email"
            />
            <BaseInput
              secureEntry
              label="Password"
              value={state.password}
              onChangeText={handleInputChange}
              placeholder="Password"
            />
            <StyledText
              className="text-base font-normal text-right text-textLightColor py-2 font-poppinsRegular"
              // To Add workflow on clicking forgot password
            >
              Forget password?
            </StyledText>
          </StyledView>
        </DismissKeyboard>
        {error && (
          <StyledText className="p-2 text-red-500 text-center text-base font-poppinsRegular">
            {error}
          </StyledText>
        )}
      </StyledView>
      <StyledView className="w-full flex flex-row justify-between gap-2 items-start py-3.5">
        <StyledButton
          className=" w-full px-10 py-4 bg-primary rounded-xl text-center"
          onPress={handleLoginIntoAccount}
        >
          <StyledText className="text-white text-lg text-center font-poppinsMedium">
            Login
          </StyledText>
        </StyledButton>
      </StyledView>
    </StyledView>
  );
};

export default Login;

const styles = StyleSheet.create({});
