import { useEffect, useState } from "react";
import { User } from "../types/types";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

export const useProfileCard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const colRef = collection(db, "user");
    const getUsers = async () => {
      const data = await getDocs(colRef);
      data.forEach((doc) => {
        setUser(doc.data() as User);
      });
    };
    getUsers();
  }, []);

  return { user };
};
