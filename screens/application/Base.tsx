import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  StyledButton,
  StyledImage,
  StyledText,
  StyledView,
} from "@/components/StyledComponents";
import BaseInput from "@/components/BaseInput";
import { UPLOAD_PLACEHOLDER } from "@/constants/fixtures";
import { Feather } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";
import * as ImagePicker from "expo-image-picker";
import { findLocalUser } from "@/services/database/helpers";
import { uploadFile } from "@/services/firebase/storage";
import { hasEmptyFields } from "@/utils/helpers";

interface FormState {
  nationalId: string;
  driverLicenseId: string;
}
interface ImageObj {
  id: string;
  url: string;
  name: string;
  type: any;
}

const BaseScreen = ({
  onSubmitBaseInformation,
}: {
  onSubmitBaseInformation: (data: any) => void;
}) => {
  const [state, setState] = useState<FormState>({
    nationalId: "",
    driverLicenseId: "",
  });
  const [image, setImage] = useState<ImageObj>({
    id: "",
    url: "",
    name: "",
    type: "",
  });
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const handleInputChange = (identifier: string, value: string) => {
    setState((prevState: any) => ({
      ...prevState,
      [identifier]: value,
    }));
    setError(null);
  };
  const handleSubmitBaseInfo = () => {
    if (!hasEmptyFields(state) && !hasEmptyFields(image)) {
      onSubmitBaseInformation({
        ...state,
        passportPhotoUrl: image.url,
      });
    } else {
      setError("Please note that all fields & passport photo are required");
    }
  };
  const handleGotDownloadUrl = (url: string) =>
    setImage((prevState) => ({ ...prevState, url }));

  const handleUploadImg = async () => {
    setError(null);
    if (!image.name) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
      if (!result.canceled) {
        const { uri, type } = result.assets[0];
        const user = await findLocalUser();
        const IMAGE_NAME = `${user.firstName}_${
          user.lastName
        }-passportIMG-${new Date().getTime()}`;
        setImage({
          url: uri,
          id: IMAGE_NAME,
          name: IMAGE_NAME,
          type: type,
        });
        await uploadFile(
          uri,
          type,
          setProgress,
          handleGotDownloadUrl,
          IMAGE_NAME
        );
      }
    }
  };
  const profileImg = image.url || UPLOAD_PLACEHOLDER;

  return (
    <StyledView className="gap-10">
      <StyledView className="flex flex-row items-start">
        <StyledView>
          <StyledView className="rounded-lg border border-borderColorLight">
            <StyledImage
              source={{
                uri: profileImg,
                width: 152,
                height: 142,
              }}
              className="rounded-lg"
            />
          </StyledView>

          <StyledButton
            className={`p-2.5 rounded-full border w-fit items-center absolute -bottom-4 -right-4 ${
              image.url.includes("http")
                ? " bg-white border-white"
                : "bg-white border-borderColorLight text-textLightColor"
            }  `}
            onPress={handleUploadImg}
            disabled={image.url.includes("http")}
          >
            {image.url.includes("http") ? (
              <StyledText className="text-successGreen"> Uploaded </StyledText>
            ) : (
              <Feather
                name="upload-cloud"
                size={20}
                color={image.url.includes("http") ? "#fff" : "#858597"}
              />
            )}
          </StyledButton>
        </StyledView>

        <StyledView className="px-4">
          <StyledText className="text-textLightColor text-sm font-poppinsRegular">
            Upload Passport Photo
          </StyledText>
          <StyledText className="text-borderColorLight text-xs font-poppinsRegular py-4">
            * Size 2MB, Clear, Colored
          </StyledText>
        </StyledView>
      </StyledView>
      <StyledView>
        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
      </StyledView>
      <StyledView>
        <BaseInput
          label="National ID"
          value={state.nationalId}
          onChangeText={handleInputChange}
          identifier="nationalId"
          placeholder="Enter number written on national ID"
        />
        <Text> </Text>
        <BaseInput
          label="Driver License ID"
          value={state.driverLicenseId}
          onChangeText={handleInputChange}
          identifier="driverLicenseId"
          placeholder="Enter number written on Driver License"
        />
      </StyledView>
      {error && (
        <StyledText className="p-2 text-red-500 text-center text-base font-poppinsRegular">
          {error}
        </StyledText>
      )}
      <StyledView>
        <StyledButton
          className="w-full px-10 py-4 bg-primary rounded-xl text-center"
          onPress={handleSubmitBaseInfo}
        >
          <StyledText className="text-white text-lg text-center font-poppinsMedium">
            Continue
          </StyledText>
        </StyledButton>
      </StyledView>
    </StyledView>
  );
};

export default BaseScreen;
