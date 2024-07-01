import React, { useEffect, useState } from "react";
import { StyledImage, StyledText, StyledView } from "./StyledComponents";
import { findLocalUser } from "@/services/database/helpers";
import { StatusBar } from "react-native";
import { PLACEHOLDER_IMG } from "@/constants/fixtures";

const TopComponent = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    (async () => {
      await findCurrentUser();
    })();
  }, []);

  const findCurrentUser = async () => {
    const localUser = await findLocalUser();
    setUser(localUser);
  };
  const userImg = user?.photoUrl ? user.photoUrl : PLACEHOLDER_IMG;
  return (
    <StyledView className="bg-primary py-10 px-2 h-2/4 justify-center">
      <StatusBar backgroundColor="#d51b53" barStyle="light-content" />
      <StyledView className="flex flex-row justify-between h-full items-center">
        <StyledView className="px-8">
          <StyledText className="text-white text-5xl font-poppinsLight">
            Hello,
          </StyledText>
          <StyledText className="text-white text-5xl font-poppinsBold h-fit py-4 ">
            {user?.lastName || "Unknown"}
          </StyledText>
        </StyledView>

        <StyledView className="pr-4">
          <StyledImage
            source={{
              uri: userImg,
              width: 80,
              height: 80,
            }}
            className="rounded-full"
          />
        </StyledView>
      </StyledView>
      <StyledText className="text-white text-xl font-poppinsRegular text-center">
        {"Welcome to Driver Hub"}
      </StyledText>
    </StyledView>
  );
};

export default TopComponent;
