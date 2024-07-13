import React from "react";
import { StyledImage, StyledText, StyledView } from "../StyledComponents";

const WiderCourseCard = ({ course }: { course: any }) => {
  return (
    <StyledView className="rounded-xl shadow-2xl px-4 py-5 bg-white m-2 flex flex-row justify-start items-center gap-5 my-2">
      <StyledView>
        <StyledImage
          source={{
            uri: course.thumbnail?.url,
            width: 84,
            height: 68,
          }}
          className="rounded-md"
        />
      </StyledView>
      <StyledView className="space-y-2">
        <StyledText className="text-base font-poppinsSemiBold text-textDarkColor">
          {course.title}
        </StyledText>
        <StyledText className="text-sm font-poppinsRegular text-textLightColor overflow-clip">
          {course.description}
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default WiderCourseCard;
