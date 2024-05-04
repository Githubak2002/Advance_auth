import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { signInSuccess,signInFailed,signInStart } from "../redux/user/userSlice";

const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;
const inputCSS = "border-2 border-black p-2 sm:w-[300px]";

const Login = () => {

  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  axios.defaults.withCredentials = true;
  // allows Axios to include cookies or authentication tokens when making cross-origin requests, enabling access to protected resources across different domains.

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    // console.log(`User entered data `, input);
    try {
      // axios return a res not data therefore destructuring the data obj
      dispatch(signInStart());
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/auth/login`,
        { email: input.email.toLowerCase(), password: input.password }
      );
      // console.log(data);
      if(!data.success) {
        console.log("User NOT logged in!");
        console.log(data.msg);
      } else {
        console.log("User Logged in");
        dispatch(signInSuccess(data));
        toast.success('User Logged in successfully');
        navigate("/");
      }
    } 
    catch (error) {
      console.log("error - ",error);
      // console.log("error - ",error);
      if (error.response && error.response.data) {
        dispatch(signInFailed(error.response.data.msg));
        toast.error(error.response.data.msg);
        console.log(`Error in loginUser fun → ${error.response.data.msg}`, error);
      } else {
        console.log(`Error in loginUser fun → `,error);
      }  
    }
  };

  return (
    <main
      // data-aos="zoom-in"
      className="h-[90vh] flexCenter mx-auto container flex-col"
    >
      <form
        className=" shadow-2xl border-2 border-black mt-6 px-4 py-6 flex-col flex items-center gap-y-3 justify-center"
        action=""
        onSubmit={loginUser}
      >
        <h2 className="font-bold text-xl my-2">LOGIN</h2>

        <input
          className={inputCSS}
          type="email"
          name="email"
          value={input.email}
          onChange={(e) => handleChange(e)}
          placeholder="Email"
          required
        />
        <input
          className={inputCSS}
          type="password"
          name="password"
          value={input.password}
          onChange={(e) => handleChange(e)}
          placeholder="Password"
          required
        />

        <button className="my-3 bg-blue-500 p-2 rounded-xl font-bold hover:-translate-y-1 transition-all hover:scale-105">
          Submit
        </button>

        <div className="flex">
          <h2>
            Not registered?{" "}
            <span
              className="hover:cursor-pointer text-blue-600"
              onClick={() => navigate("/signup")}
            >
              Register
            </span>
          </h2>
        </div>
        <Link className="hover:cursor-pointer text-blue-600" to="/forgotPass">
          Forgot Password?
        </Link>
      </form>

      {
        error ? <h2 className="text-red-500 mt-3">{error || "Someting went Wrong"}</h2> : <></>
      }

    </main>
  );
};

export default Login;

// name is the name attribute of the input field, and value is the current value of the input field.
