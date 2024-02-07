import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Typography,
} from "@mui/material";

import React, { ChangeEvent } from "react";
import { useProfileCard } from "../../hooks/useProfileCard";
import { User } from "../../types/types";
import FormField from "./FormField";

const ProfileCard = () => {
  const { user, updateUser } = useProfileCard();

  const [isModalOpen, setIsOpenModal] = React.useState(false);
  const [editUser, setEditUser] = React.useState(user);

  React.useEffect(() => {
    setEditUser(user);
  }, [user]);

  const validateForm = (user: User | null): boolean => {
    if (!user) {
      console.error("User is null");
      return false;
    }

    const { firstName, lastName, email, birthday } = user;

    if (!firstName || !lastName || !email || !birthday) {
      console.error("Form validation failed: All fields are required");
      return false;
    }

    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prev) => (prev === null ? null : { ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editUser && validateForm(editUser)) {
      updateUser(editUser);
      setIsOpenModal(false);
    } else {
      console.error("User is null or form validation failed");
    }
  };

  return (
    <>
      {user && (
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
          <Typography sx={{ mt: 1.5 }}>{user.email}</Typography>
          <Typography sx={{ mt: 1.5 }}>{user.birthday}</Typography>
          <Button
            onClick={() => setIsOpenModal(true)}
            variant="contained"
            size="small"
            sx={{ p: 0.5, mt: 1.5 }}
          >
            edit
          </Button>
          <Dialog
            open={isModalOpen}
            onClose={(prev) => setIsOpenModal(!prev)}
            PaperProps={{
              component: "form",
              onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
              },
            }}
          >
            <DialogTitle color="black">Edit Profile</DialogTitle>
            <DialogContent>
              <FormField
                label="First Name"
                name="firstName"
                value={editUser?.firstName}
                onChange={handleChange}
              />
              <FormField
                label="Last Name"
                name="lastName"
                value={editUser?.lastName}
                onChange={handleChange}
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                value={editUser?.email}
                onChange={handleChange}
              />

              <FormField
                label="Birthday"
                name="birthday"
                type="date"
                value={editUser?.birthday}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions sx={{ mb: 2, mr: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={(prev) => setIsOpenModal(!prev)}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      )}
    </>
  );
};

export default ProfileCard;
