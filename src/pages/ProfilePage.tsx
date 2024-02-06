import React from "react";
import Navbar from "../components/Navigation/Navbar";
import { Container } from "@mui/material";
import ProfileContainer from "../components/Profile/ProfileContainer";

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ minHeight: "calc(100VH-64px)", mt: 8, pt: 2, pr: 0, pl: 0 }}>
        <ProfileContainer />
      </Container>
    </>
  );
};

export default ProfilePage;
