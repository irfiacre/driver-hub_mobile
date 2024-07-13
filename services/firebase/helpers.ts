import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "@/utils/firebase";

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

export const subscribeToDocument = (
  collectionName: string,
  onDataChange: (data: any) => void,
  docId: string
) => {
  try {
    onSnapshot(doc(database, collectionName, docId), (snapshot) => {
      onDataChange(snapshot.data());
    });
  } catch (error: any) {
    throw error;
  }
};
