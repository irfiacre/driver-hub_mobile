import { StyleSheet } from "react-native";
import {
  StyledButton,
  StyledText,
  StyledView,
} from "@/components/StyledComponents";
import TopComponent from "@/components/TopComponent";
import LogoComponent from "@/components/logo/LogoComponent";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  const handleSubmitApplication = () => router.navigate("/application");
  return (
    <StyledView className="h-full">
      <TopComponent />
      <StyledView className="justify-center align-middle items-center">
        <LogoComponent medium />
      </StyledView>
      <StyledView className="px-10 w-full flex flex-row justify-between gap-2 items-start py-3.5">
        <StyledButton
          className="w-full px-10 py-4 bg-primary rounded-xl text-center"
          onPress={handleSubmitApplication}
        >
          <StyledText className="text-white text-lg font-poppinsMedium text-center">
            Submit Application
          </StyledText>
        </StyledButton>
      </StyledView>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
