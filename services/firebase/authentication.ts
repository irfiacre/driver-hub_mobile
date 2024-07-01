import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { findDocEntryByField } from "./helpers";
import { app } from "@/utils/firebase";
import { DRIVERS_COLLECTION_NAME } from "@/constants/collectionNames";
import { AddUserToDB } from "../database/helpers";

const auth: any = getAuth(app);
export const database = getFirestore(app);

export const signExistingUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const staffUser: any = await findDocEntryByField(
      DRIVERS_COLLECTION_NAME,
      "userId",
      user.uid
    );
    const formattedUser = {
      userId: user.uid,
      firstName: staffUser.firstName,
      lastName: staffUser.lastName,
      createdAt: user.metadata.creationTime,
      photoUrl: user.photoURL ? user.photoURL : "",
    };
    await AddUserToDB(formattedUser);
    return formattedUser;
  } catch (error: any) {
    return error;
  }
};

export const addUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error: any) {
    return error;
  }
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const getAllStaff = async () => {
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
