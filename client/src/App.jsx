import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import ForgotPass from "./pages/ForgotPass";
import "./index.css";
import ResetPass from "./pages/ResetPass";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";

const baseBackendURL = import.meta.env.VITE_BACKEND_BASE_URL;

function App() {

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get(
          `${baseBackendURL}/api/v1/auth/token/exists`
        );
        const token = response.data; // or response.headers.token
        console.log("Token received:", token);
      } catch (err) {
        console.log("Token exists or not error -  ", err);
        // Display an error message or handle the case where the token doesn't exist
      }
    };

    checkToken();
  }, []);

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route path="/resetPass/:token" element={<ResetPass />} />
        </Routes>
      </Router>
      {/* <Outlet/> */}
      <Toaster />
    </>
  );
}

export default App;
