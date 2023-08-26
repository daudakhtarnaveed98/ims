import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export const getUserRole = async (email: string) => {
  const querySnapshot = await getDocs(collection(db, "users"));

  const docSnap = querySnapshot.docs.filter(
    (doc) => doc.data().email === email,
  );

  return { role: docSnap[0].data().role };
};
