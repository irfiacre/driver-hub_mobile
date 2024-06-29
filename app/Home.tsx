import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Welcome from "@/screens/home/Welcome";
import { StyledText, StyledView } from "@/components/StyledComponents";

const Home = () => {
  return (
    <StyledView className="flex-1 items-center justify-center bg-yellow-100">
      <Welcome />
      <Text style={styles.title}>xxxxx</Text>
      <StyledText className="font-semibold">YYYYY</StyledText>
    </StyledView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    paddingHorizontal: "10%",
    paddingVertical: "20%",
  },
  title: {
    fontFamily: "Poppins_900Black_Italic",
    fontSize: 40,
  },
});
