import { Keyboard, TouchableWithoutFeedback } from "react-native";
import React from "react";

const DismissKeyboard = ({ children }: { children: any }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
