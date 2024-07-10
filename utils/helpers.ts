import { APPLICATIONS_COLLECTION } from "@/constants/collectionNames";
import { findDBrecord } from "@/services/database/helpers";
import { findDocEntryByField } from "@/services/firebase/helpers";

export const emailValidate = (email: string) => {
  if (!email) return "No Email Provided!";
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email).toLowerCase())) {
    return email;
  } else {
    return "Invalid Email!";
  }
};

export const DRIVER_ID = `0724-${Math.round(Math.random() * 100)}`;

export const hasEmptyFields = (obj: any): boolean => {
  return Object.keys(obj).some((key) => {
    const value = obj[key];
    return (
      value === "" ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "object" && Object.keys(value).length === 0)
    );
  });
};

export const findApplication = async (userId: string) => {
  const record = await findDBrecord("application");
  if (record.applicant) {
    return record;
  } else {
    const applicationData = await findDocEntryByField(
      APPLICATIONS_COLLECTION,
      "applicant.userId",
      userId
    );

    if (applicationData) return applicationData;
  }
  return {};
};
