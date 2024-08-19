import React from "react";
import { StyledImage, StyledText, StyledView } from "./StyledComponents";
import { PLACEHOLDER_IMG } from "@/constants/fixtures";
import { MaterialIcons } from "@expo/vector-icons";

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
    <StyledView className="w-full rounded-xl shadow-2xl px-4 py-5 space-y-5 border-b border-backgroundColor2">
      <StyledView className="flex flex-row items-start justify-between">
        <StyledView className="flex flex-row items-center justify-start">
          <StyledView className="p-4 bg-primary/10 w-14 h-14 rounded-full items-center justify-center">
            <StyledText className="capitalize text-borderColorLight text-lg font-poppinsMedium">{`${name[0]}${name[1]}`}</StyledText>
          </StyledView>

          <StyledView>
            <StyledText className="px-2 text-textDarkColor font-poppinsBold text-sm flex-shrink">
              {name}
            </StyledText>
            <StyledText className="px-2 text-textLightColor font-poppinsRegular text-xs w-44">
              {lastMessage}
            </StyledText>
          </StyledView>
        </StyledView>
        <StyledView className="flex justify-center items-center space-y-2">
          <StyledText className="px-2 text-textLightColor font-poppinsRegular text-sm">
            Available
          </StyledText>
          <MaterialIcons name="push-pin" size={24} color="#b8b8d2" />
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default ChatPartner;
