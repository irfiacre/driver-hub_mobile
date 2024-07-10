import React from "react";
import { StyledView } from "../StyledComponents";

const BaseCard = ({
  children,
  className,
}: {
  children: any;
  className?: string; // For tailwind additional styles
}) => {
  return (
    <StyledView
      className={`w-full bg-white rounded-xl shadow-2xl px-4 py-5 ${className}`}
    >
      {children}
    </StyledView>
  );
};

export default BaseCard;
