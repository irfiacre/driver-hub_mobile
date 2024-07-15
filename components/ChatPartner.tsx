import { View, Text } from "react-native";
import React from "react";
import { StyledImage, StyledText, StyledView } from "./StyledComponents";
import { PLACEHOLDER_IMG } from "@/constants/fixtures";
import BaseCard from "./cards/BaseCard";

const ChatPartner = ({
  name,
  photoUrl,
  lastMessage,
}: {
  name: string;
  photoUrl: string;
  lastMessage: string;
}) => {
  return (
    <StyledView className="w-full bg-white rounded-xl shadow-2xl px-4 py-5 space-y-5 border border-borderColorLight">
      <StyledView className="flex flex-row items-center justify-between">
        <StyledView className="flex flex-row items-center justify-start">
          <StyledImage
            source={{
              uri: photoUrl || PLACEHOLDER_IMG,
              width: 48,
              height: 48,
            }}
            className="rounded-lg"
          />
          <StyledView>
            <StyledText className="px-2 text-textDarkColor font-poppinsBold text-base">
              {name}
            </StyledText>
          </StyledView>
        </StyledView>

        <StyledView>
          <StyledText className="px-2 text-textLightColor font-poppinsRegular text-sm">
            Just Now
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledText className="px-2 text-textLightColor font-poppinsRegular text-base">
        {lastMessage}
      </StyledText>
    </StyledView>
  );
};

export default ChatPartner;
