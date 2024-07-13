import React from "react";
import { StyledScrollView } from "../StyledComponents";

const ScrollViewCard = ({
  children,
  className,
}: {
  children: any;
  className?: string; // For tailwind additional styles
}) => {
  return (
    <StyledScrollView
      className={`w-full rounded-xl shadow-2xl px-4 py-5 bg-white ${className}`}
    >
      {children}
    </StyledScrollView>
  );
};

export default ScrollViewCard;
