import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { User } from "@/app/dashboard/users/types";
import { db, firebaseApp } from "@/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import axios from "axios";

export const addUser = async (user: User) => {
  const auth = getAuth(firebaseApp);

  if (user.email != null && user.password != null) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    );

    const { user: savedUser } = await userCredential;

    await addDoc(collection(db, "users"), {
      id: savedUser.uid,
      email: savedUser.email,
      role: user.role,
    });

    await sendEmailVerification(savedUser);
  }
};

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    email: doc.data().email,
    role: doc.data().role,
    uid: doc.data().id,
    isEnabled: doc.data().isEnabled,
  }));
};

export const deleteUser = async (id: string, uid: string) => {
  const docRef = await doc(db, "users", id);
  await deleteDoc(docRef);

  await axios.post(`/dashboard/users/api/${uid}`);
};

export const editUser = async (id: string, user: User) => {
  const docRef = await doc(db, "users", id);
  await updateDoc(docRef, { ...user });
};
