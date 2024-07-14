import React from "react";
import { StyledImage, StyledText, StyledView } from "../StyledComponents";

const WiderCourseCard = ({ course }: { course: any }) => {
  return (
    <StyledView
      className={`rounded-xl shadow-2xl pb-4 border ${
        course.completed
          ? "bg-successGreen/5 border-successGreen/20"
          : "bg-backgroundColor border-borderColorLight/50"
      }   flex flex-row justify-start items-start gap-5 my-1 w-full h-fit`}
    >
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
      <StyledView className="flex-shrink space-y-1">
        <StyledText className="text-base font-poppinsSemiBold text-textDarkColor">
          {course.title}
        </StyledText>
        {!course.completed && (
          <StyledText className="text-sm font-poppinsRegular text-textLightColor">
            {course.description}
          </StyledText>
        )}
        {course.completed && (
          <StyledText className="pt-2 text-sm font-poppinsLight text-successGreen">
            (completed)
          </StyledText>
        )}
      </StyledView>
    </StyledView>
  );
};

export default WiderCourseCard;
