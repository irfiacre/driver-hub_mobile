import React from "react";
import { StyledImage, StyledView } from "../StyledComponents";
import { StyleSheet, Text } from "react-native";

const LogoComponent = () => {
  return (
    <StyledView className="p-2 flex flex-row items-center gap-2">
      <StyledImage
        source={require("../../assets/images/logo.png")}
        className="w-24 h-24"
      />
      <StyledView className="h-28">
        <Text style={styles.title1}>Driver</Text>
        <Text style={styles.title2}>Hub</Text>
      </StyledView>
    </StyledView>
  );
};

export default LogoComponent;

const styles = StyleSheet.create({
  title1: {
    fontSize: 46,
    color: "#d51b53",
    fontFamily: "Poppins_400Regular",
  },
  title2: {
    fontSize: 62,
    color: "#d51b53",
    marginTop: -43,
    fontFamily: "Poppins_700Bold",
  },
});
