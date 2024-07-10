import React, { useState } from "react";
import { StatusBar, View } from "react-native";
import CarouselComponent from "@/screens/Carousel";
import Login from "@/screens/auth/Login";
import SignUp from "@/screens/auth/Signup";

const Home = ({ onSignin }: { onSignin: () => void }) => {
  const [screen, setScreen] = useState<"login" | "signup" | "home">("home");
  const handleOnAuthClick = (text: "login" | "signup") => setScreen(text);
  const handleLogin = (obj: "signup" | any) => {
    if (obj === "signup") {
      setScreen(obj);
    } else {
      onSignin();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#F0F0F2" barStyle={"dark-content"} />
      {screen === "login" ? (
        <Login onSignin={handleLogin} />
      ) : screen === "signup" ? (
        <SignUp handleGoToLogin={() => handleOnAuthClick("login")} />
      ) : (
        <CarouselComponent onAuthClick={handleOnAuthClick} />
      )}
    </View>
  );
};

export default Home;
