import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  MyDrive,
  Profile,
  Recent,
  Register,
  Starred,
  Trash,
} from "@/pages";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-drive" element={<MyDrive />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
