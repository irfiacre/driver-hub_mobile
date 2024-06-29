import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StyledText, StyledTextInput, StyledView } from "./StyledComponents";

const BaseInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  identifier,
}: {
  label: string;
  value: string;
  onChangeText: (identifier: string, value: string) => void;
  placeholder?: string;
  identifier?: string;
}) => {
  const inputId = identifier
    ? identifier
    : label.split(" ").join("_").toLowerCase();
  return (
    <StyledView>
      <StyledText className="py-1.5 text-base text-textLightColor">
        {label}
      </StyledText>
      <StyledTextInput
        className="w-full h-12 border border-borderColorLight bg-white rounded-lg text-base px-2.5 text-textDarkColor"
        placeholder={placeholder ? placeholder : `enter ${label.toLowerCase()}`}
        value={value}
        onChangeText={(value: string) => onChangeText(inputId, value)}
      />
    </StyledView>
  );
};

export default BaseInput;

const styles = StyleSheet.create({});
