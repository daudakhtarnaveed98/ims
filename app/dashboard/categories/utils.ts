import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Category } from "@/app/dashboard/categories/types";
import { db } from "@/firebase";

export const addCategory = async (category: Category) => {
  await addDoc(collection(db, "categories"), category);
};

export const getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
};

export const deleteCategory = async (id: string) => {
  const docRef = await doc(db, "categories", id);
  await deleteDoc(docRef);
};
