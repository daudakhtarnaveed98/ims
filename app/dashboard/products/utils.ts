import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Product } from "@/app/dashboard/products/types";
import { db } from "@/firebase";

export const addProduct = async (product: Product) => {
  await addDoc(collection(db, "products"), product);
};

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    category: doc.data().category,
    stock: doc.data().stock,
    expiry: doc.data().expiry,
    modifiedOn: doc.data().modifiedOn,
  }));
};

export const deleteProduct = async (id: string) => {
  const docRef = await doc(db, "products", id);
  await deleteDoc(docRef);
};
