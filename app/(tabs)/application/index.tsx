import { View, Text, StatusBar } from "react-native";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { StyledView } from "@/components/StyledComponents";
import FinalScreen from "@/screens/application/Final";
import BaseScreen from "@/screens/application/Base";

const Application = () => {
  const [userInfo, setUserInfo] = useState({
    baseInformation: null,
    documentInformation: null,
  });
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <StyledView className="bg-authBackground h-full px-7 py-10">
      <Spinner visible={loading} />
      <StatusBar backgroundColor="#F0F0F2" barStyle="dark-content" />
      {userInfo.baseInformation ? <FinalScreen /> : <BaseScreen />}
    </StyledView>
  );
};

export default Application;
