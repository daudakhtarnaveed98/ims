import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
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
    lowStockQuantity: doc.data().lowStockQuantity,
    expiry: doc.data().expiry,
    modifiedOn: doc.data().modifiedOn,
    isExpiryMandatory: doc.data().isExpiryMandatory,
  }));
};

export const deleteProduct = async (id: string) => {
  const docRef = await doc(db, "products", id);
  await deleteDoc(docRef);
};

export const editProduct = async (id: string, product: Product) => {
  const docRef = await doc(db, "products", id);
  await updateDoc(docRef, { ...product });
};

export const consumeProduct = async (id: string, product: Product) => {
  const docRef = await doc(db, "products", id);
  await updateDoc(docRef, { ...product });
};
