import React, { useRef, useState } from "react";
import { View } from "react-native";
import CarouselComponent from "@/screens/Carousel";

const Home = ({ onSignin }: { onSignin: (obj: any) => void }) => {
  const handleOnAuthClick = (text: "login" | "signup") => {
    console.log("-------", text);
  };
  return (
    <View style={{ flex: 1 }}>
      <CarouselComponent onAuthClick={handleOnAuthClick} />
    </View>
  );
};

export default Home;
