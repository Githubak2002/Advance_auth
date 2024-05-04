import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { signOut } from "../redux/user/userSlice";

const baseBackendURL = import.meta.env.VITE_BACKEND_BASE_URL;

const Nav = () => {

  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.get(`${baseBackendURL}/api/v1/auth/logout`);
      // console.log(data);
      toast.success("logOut Successfull!");
      navigate('/');
      dispatch(signOut());
    } catch (err) {
      toast.error("Error!");
      console.log("Error from logoutHandler");
    }
  }

  return (
    <nav className="flex justify-between items-center gap-5 w-full px-5 mt-3">
      <Link to="/">
        <span className="black text-2xl">Auth</span>
      </Link>

      <main className="flexCenter gap-4">
      <Link to="/">Home</Link>
      {currentUser?.success ? (
        <>
          <Link to='profile'>Profile</Link>
          <button
            className="p-2 border-black border rounded-xl"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/signup">SignUp</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      </main>


    </nav>
  );
};

export default Nav;
