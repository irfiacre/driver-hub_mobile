import React from "react";
import { StyledImage, StyledText, StyledView } from "./StyledComponents";
import { PLACEHOLDER_IMG } from "@/constants/fixtures";

const SearchResult = ({
  title,
  photoUrl,
  description,
}: {
  title: string;
  photoUrl: string;
  description: string;
}) => {
  return (
    <StyledView className="w-full rounded-xl shadow-2xl px-4 py-5 space-y-5 border-b border-backgroundColor2">
      <StyledView className="flex flex-row items-start justify-between">
        <StyledView className="flex flex-row items-center justify-start">
          <StyledImage
            source={{
              uri: photoUrl || PLACEHOLDER_IMG,
              width: 80,
              height: 50,
            }}
            className="rounded-md"
          />
          <StyledView>
            <StyledText className="px-2 text-textDarkColor font-poppinsBold text-sm flex-shrink">
              {title}
            </StyledText>
            <StyledText className="px-2 text-textLightColor font-poppinsRegular text-xs w-44">
              {description}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default SearchResult;
