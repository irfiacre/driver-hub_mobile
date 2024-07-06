import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { StyledButton, StyledText, StyledView } from "./StyledComponents";
import { findLocalUser } from "@/services/database/helpers";
import { uploadFile } from "@/services/firebase/storage";
import ProgressBar from "./ProgressBar";
import { PRIMARY_COLOR } from "@/constants/fixtures";
interface UploadFileType {
  id: string;
  url: string;
  name: string;
  type: any;
}

const UploadFile = ({
  label,
  onFileFinishedUpload,
  disabled,
}: {
  label: string;
  onFileFinishedUpload: (data: UploadFileType) => void;
  disabled: boolean;
}) => {
  const [fileMetaData, setFileMetaData] = useState<UploadFileType>({
    id: "",
    url: "",
    name: "",
    type: "",
  });
  const [progress, setProgress] = useState(0);
  const handleGotDownloadUrl = (url: string) => {
    setFileMetaData((prevState) => ({ ...prevState, url: url }));
  };

  useEffect(() => {
    onFileFinishedUpload({ ...fileMetaData });
  }, [fileMetaData.url]);
  const handleUploadDocument = async () => {
    if (fileMetaData.name || disabled) {
      let result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf"],
      });

      if (!result.canceled) {
        const { uri } = result.assets[0];
        const user = await findLocalUser();
        const IMAGE_NAME = `${user.firstName}_${user.lastName}-${label
          .split(" ")
          .join("_")
          .toLowerCase()}-${new Date().getTime()}`;
        setFileMetaData({
          url: uri,
          id: IMAGE_NAME,
          name: IMAGE_NAME,
          type: "document",
        });
        await uploadFile(
          uri,
          "document",
          setProgress,
          handleGotDownloadUrl,
          IMAGE_NAME
        );
      }
    }
  };
  return (
    <StyledView className="py-2">
      <StyledText className="py-1.5 text-sm text-textLightColor font-poppinsRegular">
        {label} *
      </StyledText>
      <StyledButton
        onPress={handleUploadDocument}
        className={`w-full h-12 border ${
          fileMetaData.name ? "border-successGreen" : "border-borderColorLight"
        }  bg-white rounded-lg px-2.5 font-poppinsRegular flex flex-row items-center justify-between`}
      >
        {progress > 0 && progress < 100 ? (
          <ProgressBar progress={progress} />
        ) : (
          <StyledText
            className={`text-base  ${
              fileMetaData.name ? "text-successGreen" : "text-textLightColor"
            }   font-poppinsRegular`}
          >
            {fileMetaData.name
              ? `${fileMetaData.name.substring(0, 15)}... (${
                  fileMetaData.type
                })`
              : "Click to Select"}
          </StyledText>
        )}
        <StyledView
          className={`p-2.5 rounded-full items-center ${
            fileMetaData.name ? "text-successGreen" : "text-textLightColor"
          }`}
        >
          <Feather
            name="upload-cloud"
            size={24}
            color={
              progress > 0 && progress < 100
                ? PRIMARY_COLOR
                : fileMetaData.name
                ? "#00bf63"
                : "#858597"
            }
          />
        </StyledView>
      </StyledButton>
    </StyledView>
  );
};

export default UploadFile;
