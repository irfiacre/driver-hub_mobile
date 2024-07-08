import { StyleSheet } from "react-native";
import { StyledView } from "@/components/StyledComponents";
import { useRouter } from "expo-router";
import NoApplication from "@/screens/dashboard/NoApplication";
import { useEffect, useState } from "react";
import { findDBrecord } from "@/services/database/helpers";
import { findDocEntryByField } from "@/services/firebase/helpers";
import { APPLICATIONS_COLLECTION } from "@/constants/collectionNames";
import isAuth from "@/components/isAuth";

const Home = ({ user }: { user: any }) => {
  const router = useRouter();
  const [application, setApplication] = useState<any>({});

  useEffect(() => {
    (async () => {
      const record = await findDBrecord("application");
      if (record.applicant) {
        setApplication(record);
      } else {
        const applicationData = await findDocEntryByField(
          APPLICATIONS_COLLECTION,
          "applicant.userId",
          user.userId
        );
        if (applicationData) setApplication(applicationData);
      }
    })();
  }, []);

  console.log(application);

  const handleSubmitApplication = () => router.navigate("/application");
  return (
    <StyledView className="h-full">
      <NoApplication handleSubmitApplication={handleSubmitApplication} />
    </StyledView>
  );
};

export default isAuth(Home);
