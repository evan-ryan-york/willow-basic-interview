import { useEffect, useState } from "react";
import { User } from "../types/types";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const useProfileCard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const colRef = collection(db, "user");

    const getUsers = async () => {
      const data = await getDocs(colRef);
      data.forEach((doc) => {
        setUser({ ...doc.data(), id: doc.id } as User);
      });
    };
    getUsers();
  }, []);

  const updateUser = async (updatedUser: User) => {
    try {
      if (user) {
        const docRef = doc(db, "user", updatedUser.id);
        await updateDoc(docRef, updatedUser);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return { user, updateUser };
};
