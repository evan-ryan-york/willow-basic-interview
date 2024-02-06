import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { User } from "../../types/types";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
}

interface ProfileEditFormProps {
  user: User | null;
  updateUser: (userId: string, newData: any) => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ user, updateUser }) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    birthday: ""
  });
  const [errors, setErrors] = React.useState<any>({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthday: user.birthday
      });
    }
  }, [user]);

  const handleEditButtonClick = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors: any = {};
    if (!formData.firstName.trim()) {
      formErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      formErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }
    if (!formData.birthday) {
      formErrors.birthday = "Birthday is required";
    }
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      updateUser(user?.id as string, formData);
      handleFormClose();
    }
  };

  return (
    <React.Fragment>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        color="secondary"
        endIcon={<EditIcon />}
        onClick={handleEditButtonClick}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleFormClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle color="blue">Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please complete these fields to edit your profile.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                fullWidth
                sx={{ mt: 2 }}
                name="firstName"
                label="First Name"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                fullWidth
                sx={{ mt: 2 }}
                name="lastName"
                label="Last Name"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                sx={{ mt: 2 }}
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ mt: 2, width: "100%" }}
                  name="birthday"
                  label="Birthday"
                  value={dayjs(formData.birthday)}
                  onChange={(newValue : Dayjs | null) => {
                    setFormData({ ...formData, birthday: newValue ? newValue.format('YYYY-MM-DD') : "" });
                  }}
                />
              </LocalizationProvider>
              {errors.birthday && (
                <div style={{ color: "red" }}>{errors.birthday}</div>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ProfileEditForm;
