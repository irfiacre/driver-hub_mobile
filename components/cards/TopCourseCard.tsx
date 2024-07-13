import React from "react";
import { StyledImage, StyledText, StyledView } from "../StyledComponents";

const TopCourseCard = ({ course }: { course: any }) => {
  return (
    <StyledView className="rounded-xl shadow-2xl px-4 py-5 bg-primary/10 m-2 items-center">
      <StyledView>
        <StyledImage
          source={{
            uri: course.thumbnail?.url,
            width: 160,
            height: 86,
          }}
          className="rounded-md"
        />
      </StyledView>
      <StyledText className="text-lg font-poppinsSemiBold text-textDarkColor text-center">
        {course.title}
      </StyledText>
    </StyledView>
  );
};

export default TopCourseCard;
