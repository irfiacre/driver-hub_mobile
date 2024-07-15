import React from "react";
import { StyledImage, StyledText, StyledView } from "./StyledComponents";
import { StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";
import BaseCard from "./cards/BaseCard";

const UserTopComponent = ({ data }: { data: any }) => {
  return (
    <StyledView className="bg-primary pt-10 px-2 h-[25vh] justify-center">
      <StatusBar backgroundColor="#d51b53" barStyle="light-content" />
      <StyledView className="flex flex-row justify-between items-center py-5">
        <StyledView className="pl-4">
          <StyledText className="text-white text-2xl font-poppinsBold h-fit flex justify-center items-center">
            Hi, {data.applicant?.lastName || "Unknown"}{" "}
            <MaterialIcons name="verified" size={20} />
          </StyledText>
          <StyledText className="text-white text-base font-poppinsLight">
            Let's start our day!
          </StyledText>
        </StyledView>

        <StyledView className="pr-4">
          <StyledImage
            source={{
              uri: data.baseInformation.passportPhotoUrl,
              width: 70,
              height: 70,
            }}
            className="rounded-full"
          />
        </StyledView>
      </StyledView>

      <BaseCard>
        <StyledView className="flex flex-row justify-between">
          <StyledText className="text-textLightColor text-sm font-poppinsLight">
            Progress
          </StyledText>

          <StyledView>
            <StyledText className="text-textLightColor text-sm font-poppinsLight">
              Daily Average
            </StyledText>
            <StyledText className="text-textDarkColor text-xl font-poppinsBold">
              45 min.
            </StyledText>
          </StyledView>
        </StyledView>
        <StyledView className="w-full py-1">
          <ProgressBar progress={60} />
        </StyledView>
      </BaseCard>
    </StyledView>
  );
};

export default UserTopComponent;
