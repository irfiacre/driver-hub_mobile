import React from "react";
import { StyledImage, StyledView } from "../StyledComponents";
import { StyleSheet, Text } from "react-native";

const LogoComponent = ({ medium }: { medium?: boolean }) => {
  return (
    <StyledView className="p-2 flex flex-row items-center gap-2">
      <StyledImage
        source={require("../../assets/images/logo.png")}
        className={medium ? "w-16 h-16" : "w-24 h-24"}
      />
      <StyledView className="h-28">
        <Text style={medium ? styles.mediumTitle1 : styles.title1}>Driver</Text>
        <Text style={medium ? styles.mediumTitle2 : styles.title2}>Hub</Text>
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
  mediumTitle1: {
    fontSize: 24,
    color: "#d51b53",
    marginTop: 20,
    fontFamily: "Poppins_400Regular",
  },
  mediumTitle2: {
    fontSize: 36,
    color: "#d51b53",
    marginTop: -15,
    fontFamily: "Poppins_700Bold",
  },
});
