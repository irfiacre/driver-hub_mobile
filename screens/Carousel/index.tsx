import React, { useRef, useState } from "react";
import Welcome from "@/screens/Carousel/Welcome";
import { StyledView } from "@/components/StyledComponents";
import QuicEasy from "@/screens/Carousel/QuicEasy";
import GetStarted from "@/screens/Carousel/GetStarted";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const CarouselComponent = ({
  onAuthClick,
}: {
  onAuthClick: (text: "login" | "signup") => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const carouselRef: any = useRef(null);

  const handleSnapToItem = (index: any) => {
    setCurrentIndex(index);
    if (index === 2 && currentIndex === 0) {
      setLoopCount(loopCount + 1);
    }

    if (loopCount >= 1) {
      carouselRef.current.stopAutoplay();
    }
  };

  const width = Dimensions.get("window").width;
  const heigh = Dimensions.get("window").height;

  const handleAuthBtn = (text: "login" | "signup") => onAuthClick(text);
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop={loopCount < 1}
        width={width}
        height={heigh}
        autoPlay={true}
        defaultIndex={2}
        data={[1, 2, 3]}
        scrollAnimationDuration={1000}
        autoPlayInterval={5000}
        onSnapToItem={handleSnapToItem}
        renderItem={({ index }) => (
          <StyledView className="flex-1 items-center justify-start">
            {index === 0 ? (
              <Welcome />
            ) : index === 1 ? (
              <QuicEasy />
            ) : (
              <GetStarted onBtnPress={handleAuthBtn} />
            )}
          </StyledView>
        )}
        ref={carouselRef}
      />
    </View>
  );
};

export default CarouselComponent;
