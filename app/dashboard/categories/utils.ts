import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
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

export const updateProductsCategoryToUnassigned = async (
  category: Category,
) => {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.docs.forEach((doc) => {
    if (doc.data().category === category.name) {
      updateDoc(doc.ref, { category: "Unassigned" });
    }
  });
};

export const deleteCategory = async (id: string) => {
  const docRef = await doc(db, "categories", id);
  const docSnap = await getDoc(docRef);

  await updateProductsCategoryToUnassigned({
    id: id,
    name: docSnap.data()?.name,
  });
  await deleteDoc(docRef);
};
