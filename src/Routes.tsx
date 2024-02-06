import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

export const routes = (
  <Routes>
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="*" element={<ProfilePage />} />
  </Routes>
);
