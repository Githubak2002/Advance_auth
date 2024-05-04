import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector,useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";

const baseBackendURL = import.meta.env.VITE_BACKEND_BASE_URL;

const Home = () => {

  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await axios.get(`${baseBackendURL}/api/v1/auth/logout`);
      toast.success("logOut Successfull!");
      dispatch(signOut());
    } catch (err) {
      toast.error("Error!");
      console.log("Error from logoutHandler");
    }
  }

  return (
    <section className="flexCenter flex-col h-[90vh] gap-6 text-4xl mx-auto max-w-[1440px]">
      

      {currentUser?.success ? (
        <>
          <button
            className="mt-5 p-2 border-black border rounded-xl"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </>
      ) : (
        <div className="flex gap-7">
          <Link to="/signup">SignUp</Link>
          <Link to="/login">Login</Link>
        </div>
      )}


    </section>
  );
};

export default Home;
