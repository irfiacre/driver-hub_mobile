import React, { useRef, useState } from "react";
import { View } from "react-native";
import CarouselComponent from "@/screens/Carousel";
import Login from "@/screens/auth/Login";
import SignUp from "@/screens/auth/Signup";

const Home = ({ onSignin }: { onSignin: () => void }) => {
  const [screen, setScreen] = useState<"login" | "signup" | "home">("home");
  const handleOnAuthClick = (text: "login" | "signup") => setScreen(text);
  return (
    <View style={{ flex: 1 }}>
      {screen === "login" ? (
        <Login onSignin={onSignin} />
      ) : screen === "signup" ? (
        <SignUp handleGoToLogin={() => handleOnAuthClick("login")} />
      ) : (
        <CarouselComponent onAuthClick={handleOnAuthClick} />
      )}
    </View>
  );
};

export default Home;
