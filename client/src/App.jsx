import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
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

function App() {
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

          <Route path="/forgotPass" element={<ForgotPass/ >} />
          <Route path="/resetPass/:token" element={<ResetPass />} />
        </Routes>
      </Router>
      {/* <Outlet/> */}
      <Toaster />
    </>
  );
}

export default App;
