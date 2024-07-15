import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "@/utils/firebase";
import {
  APPLICATIONS_COLLECTION,
  STAFF_COLLECTION,
} from "@/constants/collectionNames";

export const database = getFirestore(app);

export const findDocEntryByField = async (
  collectionName: string,
  fieldName: string,
  fieldValue: string
) => {
  const result: any = [];
  try {
    const resultQuery = query(
      collection(database, collectionName),
      where(fieldName, "==", fieldValue)
    );

    const resultSnapshot: any = await getDocs(resultQuery);
    resultSnapshot.forEach((doc: any) => {
      const docData = { id: doc.id, ...doc.data() };
      result.push(docData);
    });
  } catch (error: any) {
    return { ...error };
  }
  return result[0];
};

export const createDocEntry = async (collectionName: string, docObj: any) => {
  try {
    const docRef = doc(database, collectionName, docObj.id);
    await setDoc(docRef, docObj);
    return true;
  } catch (e) {
    return false;
  }
};
export const updateDocEntry = async (
  collectionName: string,
  docEntryId: string,
  docObj: any
): Promise<boolean> => {
  try {
    const quizDocRef = doc(database, collectionName, docEntryId);
    await updateDoc(quizDocRef, docObj);
    return true;
  } catch (error: any) {
    return { ...error };
  }
};

export const subscribeToDocument = (
  collectionName: string,
  onDataChange: (data: any) => void,
  docId: string
) => {
  try {
    onSnapshot(doc(database, collectionName, docId), (snapshot) => {
      onDataChange(snapshot.data());
    });
  } catch (error: any) {}
};

export const updateApplication = async (
  applicationId: string,
  newApplicationInfo: any
): Promise<boolean> => {
  try {
    await updateDocEntry(
      APPLICATIONS_COLLECTION,
      applicationId,
      newApplicationInfo
    );

    return true;
  } catch (error: any) {
    return { ...error };
  }
};

export const findStaffUsers = async () => {
  let result: any[] = [];
  try {
    const querySnapshot = await getDocs(collection(database, "staff"));
    result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {}
  return result;
};
