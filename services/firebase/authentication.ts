import { app } from "@/util/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  query,
  updateDoc,
  arrayUnion,
  getDoc,
  deleteDoc,
  where,
  getFirestore,
} from "firebase/firestore";
import { findDocEntryByField } from "./helpers";

interface UserObject {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  role: string;
}

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
      "staff",
      "userId",
      user.uid
    );
    const formattedUser = {
      userId: user.uid,
      firstName: staffUser.firstName,
      lastName: staffUser.lastName,
      createdAt: user.metadata.creationTime,
      photoUrl: user.photoURL,
      role: staffUser.role,
    };

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
    console.error(`Error getting Adding User: `, error);
    throw error;
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
