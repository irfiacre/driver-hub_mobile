import { Alert, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  StyledButton,
  StyledText,
  StyledView,
} from "@/components/StyledComponents";
import LogoComponent from "@/components/logo/LogoComponent";
import BaseInput from "@/components/BaseInput";
import DismissKeyboard from "@/components/DismissKeyboard";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { DRIVER_ID, emailValidate, hasEmptyFields } from "@/utils/helpers";
import { addUser } from "@/services/firebase/authentication";
import { DRIVERS_COLLECTION_NAME } from "@/constants/collectionNames";
import { createDocEntry } from "@/services/firebase/helpers";
import Spinner from "react-native-loading-spinner-overlay";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  error?: string | null;
}

const SignUp = ({ handleGoToLogin }: { handleGoToLogin: () => void }) => {
  const [state, setState] = useState<FormState>({
    firstName: "",
    lastName: "",
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
  const handleCheckBox = (isChecked: boolean) =>
    console.log("===========>", isChecked);

  const handleCreateAccount = async () => {
    setLoading(true);
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
    const userEntry = await addUser(state.email, state.password);

    if (userEntry.uid) {
      const driverFormat = {
        id: DRIVER_ID,
        userId: userEntry.uid,
        firstName: state.firstName,
        lastName: state.lastName,
        nationalId: null,
        driverLicenseId: null,
        createdAt: new Date(),
        email: state.email,
        employee: false,
      };

      const driverAdded = await createDocEntry(
        DRIVERS_COLLECTION_NAME,
        driverFormat
      );
      if (driverAdded) {
        setLoading(false);
        Alert.alert("Success", "Account created successfully");
        handleGoToLogin();
      } else {
        setState((prevState: any) => ({
          ...prevState,
          error: "Something went wrong, please try again",
        }));
      }
    } else {
      if (userEntry.code.includes("email-already-in-use")) {
        Alert.alert("warning", "Email Already in use");
      }
    }
    setLoading(false);
  };

  return (
    <StyledView className="p-8 bg-authBackground h-full">
      <Spinner visible={loading} />
      <StyledView className="items-center">
        <LogoComponent medium />
      </StyledView>
      <StyledView>
        <StyledText className="text-2xl font-poppinsBold text-left">
          Sign Up
        </StyledText>
        <StyledText className="text-sm font-poppinsRegular text-borderColorLight py-2.5">
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
        {error && (
          <StyledText className="p-2 text-red-500 text-center text-base font-poppinsRegular">
            {error}
          </StyledText>
        )}
        <StyledView className="py-2.5">
          <BouncyCheckbox
            size={20}
            fillColor="#B8B8D2"
            unFillColor={"transparent"}
            text="By creating an account you have to agree with our them & condition."
            // iconStyle={{ borderColor: "red" }}
            textStyle={{ fontFamily: "Poppins_400Regular", fontSize: 14 }}
            onPress={handleCheckBox}
          />
        </StyledView>
      </StyledView>
      <StyledView className="w-full flex flex-row justify-between gap-2 items-start py-3.5">
        <StyledButton
          className=" w-full px-10 py-4 bg-primary rounded-xl text-center"
          onPress={handleCreateAccount}
        >
          <StyledText className="text-white text-lg font-poppinsMedium text-center">
            Create account
          </StyledText>
        </StyledButton>
      </StyledView>
    </StyledView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
