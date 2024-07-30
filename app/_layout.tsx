import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import Home from "./Home";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { deleteTable, findLocalUser } from "@/services/database/helpers";
import { LogBox } from "react-native";
import { syncEmployeeDetails } from "@/utils/helpers";
import { AppContextProvider } from "@/context";
import Spinner from "react-native-loading-spinner-overlay";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  LogBox.ignoreAllLogs();
  const [loaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    (async () => {
      await handleUserHasSignedIn();
    })();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handleUserHasSignedIn = async () => {
    setLoading(true);
    const localUser = await findLocalUser();
    if (localUser) {
      await syncEmployeeDetails(localUser.userId);
      setUser(localUser);
      router.navigate("/");
    }
    setLoading(false);
  };

  return (
    <AppContextProvider>
      {/* <SafeAreaProvider> */}
      <Spinner visible={loading} />
      {user ? (
        <SafeAreaView style={styles.container}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <Home onSignin={handleUserHasSignedIn} />
        </SafeAreaView>
      )}
      {/* </SafeAreaProvider> */}
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
