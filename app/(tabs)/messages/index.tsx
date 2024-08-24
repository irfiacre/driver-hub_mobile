import { StatusBar } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { findStaffUsers } from "@/services/firebase/helpers";
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components/StyledComponents";
import ChatPartner from "@/components/ChatPartner";
import { useRouter } from "expo-router";
import { AppContext } from "@/context";
import Spinner from "react-native-loading-spinner-overlay";

const message = () => {
  const [staffUsers, setStaffUsers] = useState<any>([]);
  const { _, updateContextState } = useContext<any>(AppContext);

  const router = useRouter();
  useLayoutEffect(() => {
    (async () => {
      const staffUsers = await findStaffUsers();
      setStaffUsers(staffUsers);
      updateContextState({ staffUsers });
    })();
  }, []);

  return (
    <StyledView className="bg-white h-full">
      <StatusBar backgroundColor="white" barStyle={"dark-content"} />
      <StyledText className="mx-4 text-textDarkColor text-xl font-poppinsBold p-4">
        Chat
      </StyledText>
      {staffUsers.map((elt: any) => (
        <StyledTouchableOpacity
          key={elt.userId}
          className="mx-4"
          onPress={() => router.navigate(`messages/${elt.userId}`)}
        >
          <ChatPartner
            name={`${elt.firstName} ${elt.lastName}`}
            photoUrl={elt.photoUrl}
            lastMessage={`(${elt.role}) - Available at your service`}
          />
        </StyledTouchableOpacity>
      ))}
      <StyledText className="text-borderColorLight text-xs font-poppinsRegular p-4 text-center">
        - End of Chats -
      </StyledText>
    </StyledView>
  );
};

export default message;
