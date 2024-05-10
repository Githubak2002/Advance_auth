import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { signInSuccess,signInFailed,signInStart } from "../redux/user/userSlice";

const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;
const buttonCSS = "hover:cursor-pointer text-blue-600 mt-5 border-black border-2 font-bold p-2 rounded-xl";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state.user);

  // const verifyEmail = async () => {
  //   try {
  //     const otpMail = await axios.post(`${baseURl}/api/v1/user/verifiy`,{email:currentUser.user.email});
  //     if(otpMail){
  //       console.log("otpMail ", otpMail);
  //       toast.success(otpMail.data.msg);
  //     }
  //     else{
  //       console.log("error", otpMail)
  //       toast.err(otpMail.data.msg);
  //     }
  //   } catch (err) {
  //     console.log("Error in verify Email function - ",err);
  //     toast.error("Some Error!")
  //   }
  // }

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-8">
      <main className="shadow-2xl border-2 border-black mt-6 px-4 py-6 flex-col flexCenter gap-y-3 rounded-lg">
        <h2 className="font-bold text-xl my-2">PROFILE</h2>

        <h2>
          User Name : <span>{currentUser.user.userName} </span>
        </h2>
        <h2>Email : {currentUser.user.email} </h2>
        <h2>
          Verified :{" "}
          {currentUser.user.verified ? "Verified User" : "NOT Verified"}{" "}
        </h2>

        <div className="flex w-full justify-between items-center ">
          <Link
            className={buttonCSS}
            to="/"
          >
            Home
          </Link>

          {/* <button onClick={verifyEmail} className={buttonCSS}>Verify Now</button> */}
        </div>


      </main>
    </section>
  );
};

export default Profile;
