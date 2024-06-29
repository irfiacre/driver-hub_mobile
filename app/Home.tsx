import React, { useRef, useState } from "react";
import Welcome from "@/screens/home/Welcome";
import { StyledView } from "@/components/StyledComponents";
import QuicEasy from "@/screens/home/QuicEasy";
import GetStarted from "@/screens/home/GetStarted";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const Home = () => {
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
        // onSnapToItem={(index) => index === 2 && pauseLoop(false)}
        renderItem={({ index }) => (
          <StyledView className="flex-1 items-center justify-start">
            {index === 0 ? (
              <Welcome />
            ) : index === 1 ? (
              <QuicEasy />
            ) : (
              <GetStarted />
            )}
          </StyledView>
        )}
        ref={carouselRef}
      />
    </View>
  );
};

export default Home;
