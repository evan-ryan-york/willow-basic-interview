import { Avatar, Paper, Typography } from "@mui/material";
import React from "react";
import { useProfileCard } from "../../hooks/useProfileCard";

const ProfileCard = () => {
  const { user } = useProfileCard();
  return (
    <>
      {user && (
        <Paper
          elevation={3}
          sx={{ p: 4, mt: 2, display: "flex", alignItems: "center", flexDirection: "column" }}
        >
          <Avatar
            src="https://source.unsplash.com/random"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h3">{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography sx={{mt: 2}}>{user.email}</Typography>
          <Typography sx={{mt: 2}}>{user.birthday}</Typography>
        </Paper>
      )}
    </>
  );
};

export default ProfileCard;
