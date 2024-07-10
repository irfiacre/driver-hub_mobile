import { StyleSheet } from "react-native";
import { StyledView } from "@/components/StyledComponents";
import { useRouter } from "expo-router";
import NoApplication from "@/screens/dashboard/NoApplication";
import { useEffect, useState } from "react";
import { findDBrecord } from "@/services/database/helpers";
import { findDocEntryByField } from "@/services/firebase/helpers";
import { APPLICATIONS_COLLECTION } from "@/constants/collectionNames";
import isAuth from "@/components/isAuth";
import Application from "@/screens/dashboard/Application";
import Spinner from "react-native-loading-spinner-overlay";
import { findApplication } from "@/utils/helpers";

const Home = ({ user }: { user: any }) => {
  const router = useRouter();
  const [application, setApplication] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const applicationData = await findApplication(user.userId);
      setApplication(applicationData);
      setLoading(false);
    })();
  }, []);

  const handleSubmitApplication = () => router.navigate("/application");

  return (
    <StyledView className="h-full">
      <Spinner visible={loading} />
      {application.applicant ? (
        <Application applicationData={application} />
      ) : (
        <NoApplication handleSubmitApplication={handleSubmitApplication} />
      )}
    </StyledView>
  );
};

export default isAuth(Home);
