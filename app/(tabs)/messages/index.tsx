import { StatusBar } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { findStaffUsers } from "@/services/firebase/helpers";
import {
  StyledTouchableOpacity,
  StyledView,
} from "@/components/StyledComponents";
import ChatPartner from "@/components/ChatPartner";
import { useRouter } from "expo-router";
import { AppContext } from "@/context";

const message = () => {
  const [staffUsers, setStaffUsers] = useState<any>([]);
  const { _, updateContextState, resetContext } = useContext<any>(AppContext);

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
      {staffUsers.map((elt: any) => (
        <StyledTouchableOpacity
          key={elt.userId}
          className="m-4"
          onPress={() => router.navigate(`messages/${elt.userId}`)}
        >
          <ChatPartner
            name={`${elt.firstName} ${elt.lastName}`}
            photoUrl={elt.photoUrl}
            lastMessage="Congratulations on completing the first lesson, keep up the good work!"
          />
        </StyledTouchableOpacity>
      ))}
    </StyledView>
  );
};

export default message;
