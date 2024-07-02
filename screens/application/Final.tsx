import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  StyledButton,
  StyledText,
  StyledView,
} from "@/components/StyledComponents";
import { hasEmptyFields } from "@/utils/helpers";
import UploadFile from "@/components/UploadFile";

const FinalScreen = ({
  onSubmitApplication,
}: {
  onSubmitApplication: (data: any) => void;
}) => {
  const [state, setState] = useState({
    nationalIdDoc: null,
    driverLicenseIdDoc: null,
    certificate: null,
    proof: null,
    checkup: null,
  });
  const [error, setError] = useState<string | null>(null);
  const handleSubmitApplication = () => {
    if (!hasEmptyFields(state)) {
      onSubmitApplication({ ...state });
    } else {
      setError("Please note that all documents are required");
    }
  };
  const handleSubmitNationalId = (data: any) =>
    setState((prevState) => ({ ...prevState, nationalIdDoc: data }));
  const handleSubmitDriverId = (data: any) =>
    setState((prevState) => ({ ...prevState, driverLicenseIdDoc: data }));
  const handleSubmitCertificate = (data: any) =>
    setState((prevState) => ({ ...prevState, certificate: data }));
  const handleSubmitProof = (data: any) =>
    setState((prevState) => ({ ...prevState, proof: data }));
  const handleSubmitCheckup = (data: any) =>
    setState((prevState) => ({ ...prevState, checkup: data }));

  return (
    <StyledView className="gap-5">
      <StyledText className="text-xl font-poppinsMedium text-center text-primary">
        Required Documents
      </StyledText>
      <StyledView>
        <UploadFile
          label="National ID"
          onFileFinishedUpload={handleSubmitNationalId}
          disabled={!!state.nationalIdDoc}
        />
        <UploadFile
          label="License"
          onFileFinishedUpload={handleSubmitDriverId}
          disabled={!!state.driverLicenseIdDoc}
        />
        <UploadFile
          label="Certificate of Good conduct"
          onFileFinishedUpload={handleSubmitCertificate}
          disabled={!!state.certificate}
        />
        <UploadFile
          label="Proof of vehicle ownership"
          onFileFinishedUpload={handleSubmitProof}
          disabled={!!state.proof}
        />
        <UploadFile
          label="Last Car Checkup"
          onFileFinishedUpload={handleSubmitCheckup}
          disabled={!!state.checkup}
        />
      </StyledView>
      {error && (
        <StyledText className="text-red-500 text-center text-base font-poppinsRegular">
          {error}
        </StyledText>
      )}
      <StyledView>
        <StyledButton
          className="w-full px-10 py-4 bg-primary rounded-xl text-center"
          onPress={handleSubmitApplication}
        >
          <StyledText className="text-white text-lg text-center font-poppinsMedium">
            Submit
          </StyledText>
        </StyledButton>
      </StyledView>
    </StyledView>
  );
};

export default FinalScreen;
