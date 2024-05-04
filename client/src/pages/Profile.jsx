import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { signOut } from "../redux/user/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state.user);

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-8">
      <main className=" shadow-2xl border-2 border-black mt-6 px-4 py-6 flex-col flex items-center gap-y-3 justify-center">
        <h2 className="font-bold text-xl my-2">PROFILE</h2>

        <h2>
          User Name : <span>
          {currentUser.user.userName}{" "}
          </span>
        </h2>
        <h2>Email : {currentUser.user.email} </h2>
        <h2>
          Verified :{" "}
          {currentUser.user.verified ? "Verified User" : "NOT Verified"}{" "}
        </h2>

        <Link className="hover:cursor-pointer text-blue-600" to="/">
          Home
        </Link>
      </main>
    </section>
  );
};

export default Profile;
