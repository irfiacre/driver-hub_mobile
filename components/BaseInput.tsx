import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { StyledText, StyledTextInput, StyledView } from "./StyledComponents";

const BaseInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  identifier,
  secureEntry,
}: {
  label: string;
  value: string;
  onChangeText: (identifier: string, value: string) => void;
  placeholder?: string;
  identifier?: string;
  secureEntry?: boolean;
}) => {
  const inputId = identifier
    ? identifier
    : label.split(" ").join("_").toLowerCase();
  // const [hasSecureEntry, setHasSecureEntry] = useState(secureEntry);
  // To add hide and show password (icon)
  return (
    <StyledView>
      <StyledText className="py-1.5 text-base text-textLightColor font-poppinsRegular">
        {label}
      </StyledText>
      <StyledTextInput
        className="w-full h-12 border border-borderColorLight bg-white rounded-lg text-base px-2.5 text-textDarkColor font-poppinsRegular"
        placeholder={placeholder ? placeholder : `enter ${label.toLowerCase()}`}
        value={value}
        onChangeText={(value: string) => onChangeText(inputId, value)}
        secureTextEntry={secureEntry}
      />
    </StyledView>
  );
};

export default BaseInput;

const styles = StyleSheet.create({});
