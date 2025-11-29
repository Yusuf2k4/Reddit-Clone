import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./FirebaseConfig";
import { v4 as uuidv4 } from "uuid";
export async function uploadImage(image, type) {
  const orignalFileName = image.name;
  const uniqueId = uuidv4();
  const newFileName = `${uniqueId}.${orignalFileName}`;
  let storageRef;
  if (type === "Banner") {
    storageRef = ref(storage, `Images/Banner/${newFileName}`);
  } else if (type === "Logo") {
    storageRef = ref(storage, `Images/Logo/${newFileName}`);
  } else {
    storageRef = ref(storage, `Images/Post images/${newFileName}`);
  }

  const snapshot = await uploadBytes(storageRef, image);
  const url = await getDownloadURL(snapshot.ref);

  return url;
}
