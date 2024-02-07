import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProfileCard } from "../../hooks/useProfileCard";
import { db } from "../../firebase";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
}

const ProfileCard = () => {
  // const { user } = useProfileCard();
  const [openDialog, setOpenDialog] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const [user, setUser] = useState<User | null>(null);

  const colRef = collection(db, "user");
  const getUsers = async () => {
    const data = await getDocs(colRef);
    data.forEach((doc: any) => {
      setUser(doc.data() as User);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setEditUser(user ? { ...user } : null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editUser) {
      setEditUser({ ...editUser, [name]: value });
    }
  };

  const handleSubmit = async (data: any) => {
    if (editUser && user) {
      const payload = {
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        birthday: editUser.birthday,
        email: editUser.email,
      };
      try {
        const userDocRef = doc(db, "user", data?.id);
        await updateDoc(userDocRef, { payload });
        getUsers();
        console.log("User data updated successfully!");
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    } else {
      console.error("User data or edit data is null.");
    }
  };

  return (
    <>
      {user && (
        <>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mt: 2,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              src="https://source.unsplash.com/random"
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h3">{`${user.firstName} ${user.lastName}`}</Typography>
            <Typography sx={{ mt: 2 }}>{user.email}</Typography>
            <Typography sx={{ mt: 2 }}>{user.birthday}</Typography>
            <Button variant="outlined" onClick={handleOpenDialog}>
              Edit
            </Button>
          </Paper>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                value={editUser?.firstName || ""}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                id="lastName"
                name="lastName"
                label="Last Name"
                fullWidth
                value={editUser?.lastName || ""}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                value={editUser?.email || ""}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                id="birthday"
                name="birthday"
                label="Birthday"
                type="date"
                fullWidth
                value={editUser?.birthday || ""}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={() => handleSubmit(user)}>Submit</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default ProfileCard;
