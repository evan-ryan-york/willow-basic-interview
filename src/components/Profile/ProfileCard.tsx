import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Typography,
  TextField,
} from "@mui/material";

import React, { ChangeEvent } from "react";
import { useProfileCard } from "../../hooks/useProfileCard";
import { User } from "../../types/types";

const ProfileCard = () => {
  const { user, updateUserInfo } = useProfileCard();

  const [isModalOpen, setIsOpenModal] = React.useState(false);
  const [editUser, setEditUser] = React.useState(user);
  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string }>(
    {}
  );

  React.useEffect(() => {
    setEditUser(user);
  }, [user]);

  interface FormDataProps {
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    name: string;
    type?: string;
  }

  const validateFormData = (user: User | null): boolean => {
    if (!user) {
      console.error("User is null");
      return false;
    }

    const { firstName, lastName, email, birthday } = user;
    const errors: { [key: string]: string } = {};

    if (!firstName) {
      errors.firstName = "First name is required";
    }
    if (!lastName) {
      errors.lastName = "Last name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";
      }
    }
    if (!birthday) {
      errors.birthday = "Birthday date is required";
    }

    setFormErrors(errors);

    // Check if there are any errors
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prev) => (prev === null ? null : { ...prev, [name]: value }));
    // Clear the error message for the current field
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = () => {
    if (editUser && validateFormData(editUser)) {
      updateUserInfo(editUser);
      setIsOpenModal(false);
      console.log("User data updated successfully!");
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
              <TextField
                autoFocus
                margin="dense"
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                value={editUser?.firstName}
                onChange={handleChange}
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
              />
              <TextField
                margin="dense"
                id="lastName"
                name="lastName"
                label="Last Name"
                fullWidth
                value={editUser?.lastName}
                onChange={handleChange}
                error={!!formErrors.lastName}
                helperText={formErrors.lastName}
              />
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                value={editUser?.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
              <TextField
                margin="dense"
                id="birthday"
                name="birthday"
                label="Birthday"
                type="date"
                fullWidth
                value={editUser?.birthday}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!formErrors.birthday}
                helperText={formErrors.birthday}
              />
            </DialogContent>
            <DialogActions>
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
