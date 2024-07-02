import { PRIMARY_COLOR } from "@/constants/fixtures";
import React from "react";
import { View } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { StyledView } from "./StyledComponents";

const ProgressBar = ({ progress }: { progress: number }) => {
  const barWidth = 230;
  const progressWidth = (progress / 100) * barWidth;
  return (
    <StyledView>
      <Svg width={barWidth} height="7">
        <Rect
          width={barWidth}
          height={"100%"}
          fill={"#eee"}
          rx={3.5}
          ry={3.5}
        />
        <Rect
          width={progressWidth}
          height={"100%"}
          fill={PRIMARY_COLOR}
          rx={3.5}
          ry={3.5}
        />
      </Svg>
    </StyledView>
  );
};

export default ProgressBar;
