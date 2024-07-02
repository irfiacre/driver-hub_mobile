import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { app } from "@/utils/firebase";
import { DOCUMENTS_COLLECTION } from "@/constants/collectionNames";

export const storage = getStorage(app);
export const database = getFirestore(app);

export const uploadFile = async (
  uri: any,
  fileType: any,
  onProgressChange: (progress: any) => void,
  onGotDownloadUrl: (url: string) => void,
  fileName?: string
) => {
  let fileDownloadUrl = "";
  const REFERENCE_DIR = fileType.includes("image") ? "images" : "documents";
  const response = await fetch(uri);
  const imageBlob = await response.blob();

  const storageRef = ref(storage, `${REFERENCE_DIR}/` + fileName);
  const uploadTask = uploadBytesResumable(storageRef, imageBlob);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgressChange(progress.toFixed());
    },
    (error) => {
      return { ...error };
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        if (downloadURL) {
          onGotDownloadUrl(downloadURL);
          const fileMetadata: any = {
            id: fileName,
            url: downloadURL,
            name: fileName,
            type: fileType,
          };
          const docRef = doc(database, DOCUMENTS_COLLECTION, fileMetadata.id);
          await setDoc(docRef, fileMetadata);
          return fileMetadata;
        }
      });
    }
  );

  return false;
};
