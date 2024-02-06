import { useEffect, useState } from "react";
import { User } from "../types/types";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const useProfileCard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const colRef = collection(db, "user");
    const getUsers = async () => {
      const data = await getDocs(colRef);
      data.forEach((doc) => {
        setUser({ ...(doc.data() as User), id: doc.id });
      });
    };
    getUsers();
  }, []);

  const updateUser = async (userId: string, newData: any) => {
    try {
      const userDoc = doc(db, "user", userId);
      await updateDoc(userDoc, newData);

      setUser((prevUser) => ({ ...prevUser, ...newData }));
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return { user, updateUser };
};
