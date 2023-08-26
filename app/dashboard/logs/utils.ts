import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Log } from "@/app/dashboard/logs/types";
import { DateTime } from "luxon";
import { Product } from "@/app/dashboard/products/types";

export const addLog = async (log: Log) => {
  await addDoc(collection(db, "logs"), log);
};

export const getLogs = async () => {
  const logsRef = collection(db, "logs");
  const q = query(logsRef, orderBy("timestamp", "desc"), limit(250));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    user: doc.data().user,
    action: doc.data().action,
    description: doc.data().description,
    productName: doc.data().productName,
    timestamp: doc.data().timestamp,
  }));
};

export const addProductAddLog = async (
  user: string,
  productName: string,
  productQuantity: number,
) => {
  const action = "Add product";
  const description = `Added a new product with initial stock of ${productQuantity} units`;
  const timestamp = `${DateTime.now().toFormat(
    "dd/MM/yyyy",
  )} ${DateTime.now().toFormat("HH:mm:ss")}`;

  await addLog({ user, action, productName, description, timestamp });
};

export const addProductConsumeLog = async (
  user: string,
  productName: string,
  productQuantity: number,
) => {
  const action = "Consume product";
  const description = `Consumed ${productQuantity} units`;
  const timestamp = `${DateTime.now().toFormat(
    "dd/MM/yyyy",
  )} ${DateTime.now().toFormat("HH:mm:ss")}`;

  await addLog({ user, action, productName, description, timestamp });
};

export const addProductDeleteLog = async (
  user: string,
  productName: string,
) => {
  const action = "Delete product";
  const description = `Product was deleted`;
  const timestamp = `${DateTime.now().toFormat(
    "dd/MM/yyyy",
  )} ${DateTime.now().toFormat("HH:mm:ss")}`;

  await addLog({ user, action, productName, description, timestamp });
};

export const addProductEditLog = async (
  user: string,
  productName: string,
  oldProduct: Product,
  updatedProduct: Product,
) => {
  let changes = "";

  if (oldProduct.name !== updatedProduct.name) {
    changes = `updated name from "${oldProduct.name}" to "${updatedProduct.name}";`;
  }

  if (oldProduct.expiry !== updatedProduct.expiry) {
    changes = `${changes} updated expiry from ${
      oldProduct.expiry === "" ? 'N/A"' : `"${oldProduct.expiry}"`
    } to "${updatedProduct.expiry}";`;
  }

  if (oldProduct.category !== updatedProduct.category) {
    changes = `${changes} updated category from "${oldProduct.category}" to "${updatedProduct.category}";`;
  }

  if (oldProduct.stock !== updatedProduct.stock) {
    changes = `${changes} updated stock from "${oldProduct.stock}" to "${updatedProduct.stock}"`;
  }

  const action = "Edit product";
  const description = `Edited ${productName}; ${changes}`;
  const timestamp = `${DateTime.now().toFormat(
    "dd/MM/yyyy",
  )} ${DateTime.now().toFormat("HH:mm:ss")}`;

  await addLog({ user, action, productName, description, timestamp });
};
