import { View, Text } from "react-native";
import React, { useContext } from "react";
import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components/StyledComponents";
import { AppContext } from "@/context";
import { PLACEHOLDER_IMG } from "@/constants/fixtures";
import { deleteTable } from "@/services/database/helpers";
import { signOutUser } from "@/services/firebase/authentication";
import { useRouter } from "expo-router";

const account = () => {
  const router = useRouter();
  const { contextState, updateContextState, resetContext } =
    useContext<any>(AppContext);
  const handleLogout = async () => {
    const userSignedOut = await signOutUser();
    if (userSignedOut) {
      const deleteDBUser = await deleteTable("user");
      const deleteDBApplication = await deleteTable("application");
      if (deleteDBUser && deleteDBApplication) resetContext();
    }
    router.replace({ pathname: "/", params: { hasLoggedOut: "true" } });
  };

  return (
    <StyledView className="p-4 space-y-5">
      <StyledView>
        <StyledText className="text-xl font-poppinsBold text-textDarkColor py-2.5">
          Account
        </StyledText>
      </StyledView>
      <StyledView className="px-2 items-center justify-center">
        <StyledView>
          <StyledImage
            source={{
              uri:
                contextState.application.baseInformation?.passportPhotoUrl ||
                PLACEHOLDER_IMG,
              width: 100,
              height: 100,
            }}
            className="rounded-full"
          />
        </StyledView>
        <StyledText className="text-xl font-poppinsBold text-textDarkColor py-2.5">
          {`${contextState.application.applicant?.firstName} ${contextState.application.applicant?.lastName}`}
        </StyledText>
      </StyledView>
      <StyledView className="w-full flex flex-row justify-between gap-2 items-start py-3.5 px-6">
        <StyledTouchableOpacity
          className="w-full px-10 py-4  bg-primary rounded-xl text-center"
          onPress={handleLogout}
        >
          <StyledText className="text-white text-lg text-center font-poppinsMedium">
            Sign Out
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default account;
