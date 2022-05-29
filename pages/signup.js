import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfmPassword, setShowConfmPassword] = useState(false);

  const goToLogin = () => {
    router.push("/login");
  };

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confmpassword: "",
    role: "guest",
    forgetQues: "",
    forgetAns: "",
  });

  const onChange = (e, key) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [key]: e.target.value,
    }));
    //console.log(credentials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        role: credentials.role,
        forgetQues: credentials.forgetQues,
        forgetAns: credentials.forgetAns,
      }),
    });

    const json = await response.json();
    console.log("response from ui = ", json);

    if (json.success === true) {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [e.target.name]: "",
      }));
      toast.success('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      toast.error("Sigup Failed! Please Try Again", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  function togglePasswordVisibilty() {
    setShowPassword(!showPassword ? true : false);
  }

  function toggleConfmPasswordVisibilty() {
    setShowConfmPassword(!showConfmPassword ? true : false);
  }

  return (
    <>
      <div className=" w-full xl:flex xl:items-center xl:justify-center mx-auto">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div
          id="loginbody"
          className="sm:p-2 sm:border-2 pt-3 sm:mt-10 border-blue-900 rounded-xl bg-blue-200 lg:w-5/6 flex xl:flex-row item-center justify-center "
        >
          <div className="m-3">
            <h2 className="my-3 text-2xl font-medium sm:text-4xl lg:text-5xl xl:text-6xl text-center">
              Create your account here{" "}
            </h2>
            <form
              className="login-form p-2 sm:p-5 sm:w-full lg:w-full"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-gray-800 text-base sm:text-lg font-medium sm:font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="shadow border rounded-md sm:rounded-lg w-full py-2 px-1 sm:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-gray-400"
                  placeholder="Type name here..."
                  id="name"
                  name="name"
                  value={credentials.name}
                  onChange={(e) => onChange(e, "name")}
                  aria-describedby="emailHelp"
                />
              </div>
              {/* --------------- */}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-gray-800 text-base sm:text-lg font-medium sm:font-bold mb-2"
                >
                  Email{" "}
                </label>
                <input
                  type="email"
                  className="shadow border rounded-md sm:rounded-lg w-full py-2 px-1 sm:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-gray-400"
                  placeholder="Type email here..."
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={(e) => onChange(e, "email")}
                  aria-describedby="emailHelp"
                />
              </div>
              {/* ----------------- */}
              <div className="mb-3">
                <div className="flex sm:flex-row flex-col sm:items-baseline">
                  <label
                    htmlFor="password"
                    className="block text-gray-800 text-base sm:text-lg font-medium sm:font-bold mb-2 w-2/5"
                  >
                    Password
                  </label>
                  <span className="flex flex-row items-center  bg-white rounded-md px-1 sm:px-3  w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="shadow appearance-none border border-red-500 rounded-md sm:rounded-lg w-full py-2 px-1 sm:px-3 text-gray-700  leading-tight focus:border-sky-700 focus:shadow-outline placeholder:italic placeholder:text-gray-400"
                      placeholder="Type password here..."
                      id="password"
                      name="password"
                      minLength={5}
                      value={credentials.password}
                      onChange={(e) => onChange(e, "password")}
                      style={{ outline: "none", border: 0 }}
                      required
                    />
                    {showPassword ? (
                      <AiFillEyeInvisible
                        title="Hide Password"
                        onClick={togglePasswordVisibilty}
                      />
                    ) : (
                      <AiFillEye
                        onClick={togglePasswordVisibilty}
                        title="Show Password"
                      />
                    )}
                  </span>
                </div>
              </div>
              {/* ------------ */}
              <div className="mb-3">
                <div className="flex sm:flex-row flex-col sm:items-baseline">
                  <label
                    htmlFor="confmpassword"
                    className="block text-gray-800 text-base sm:text-lg font-medium sm:font-bold mb-2 xl:w-2/5"
                  >
                    Confirm Password
                  </label>
                  <span className="flex flex-row items-center  bg-white rounded-md px-1 sm:px-3  w-full">
                    <input
                      type={showConfmPassword ? "text" : "password"}
                      className="shadow appearance-none border border-red-500 rounded-md sm:rounded-lg w-full py-2 px-1 sm:px-3 text-gray-700 leading-tight focus:border-sky-700 focus:shadow-outline placeholder:italic placeholder:text-gray-400"
                      placeholder="Confirm password here..."
                      id="confmpassword"
                      name="confmpassword"
                      value={credentials.confmpassword}
                      onChange={(e) => onChange(e, "confmpassword")}
                      minLength={5}
                      required
                      style={{ border: 0, outline: "none" }}
                    />
                    {showPassword ? (
                      <AiFillEyeInvisible
                        title="Hide Password"
                        onClick={toggleConfmPasswordVisibilty}
                      />
                    ) : (
                      <AiFillEye
                        onClick={toggleConfmPasswordVisibilty}
                        title="Show Password"
                      />
                    )}
                  </span>
                </div>
              </div>
              {/* ------ */}
              <div className="mb-3 col-md">
                <div className="flex flex-row items-center space-x-3">
                  <label
                    htmlFor="role"
                    className="block text-gray-800 text-base sm:text-lg font-medium sm:font-bold"
                  >
                    Role
                  </label>
                  <div className="form-check form-check-inline mx-2 sm:mx-4">
                    <input
                      className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-1 cursor-pointer"
                      type="radio"
                      name="roleOptions"
                      id="role1"
                      value="admin"
                      onChange={(e) => onChange(e, "role")}
                    />
                    <label className="form-check-label" htmlFor="role1">
                      Admin
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-1 cursor-pointer"
                      type="radio"
                      name="roleOptions"
                      id="role2"
                      value="client"
                      onChange={(e) => onChange(e, "role")}
                    />
                    <label className="form-check-label" htmlFor="role2">
                      Client
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-1 cursor-pointer"
                      type="radio"
                      name="roleOptions"
                      id="role3"
                      value="guest"
                      onChange={(e) => onChange(e, "role")}
                    />
                    <label className="form-check-label" htmlFor="role3">
                      Guest
                    </label>
                  </div>
                </div>
              </div>
              {/* ------------ */}
              <div className="mb-3 row">
                <div className="form-floating col-6">
                  <label
                    htmlFor="forgetQues"
                    className="text-gray-800 text-base sm:text-lg font-medium  sm:font-bold"
                  >
                    Select Question
                  </label>
                  <select
                    className="form-select px-6 py-2 bg-white text-black rounded-md hover:bg-white focus:bg-white focus:outline-none focus:ring-0 active:bg-white active:shadow-lg active:text-black transition duration-150 ease-in-out flex items-center whitespace-nowrap w-full mb-3"
                    id="forgetQues"
                    name="forgetQues"
                    value={credentials.forgetQues}
                    aria-label="Floating label select example"
                    onChange={(e) => onChange(e, "forgetQues")}
                  >
                    <option className="font-italic text-gray-700 active:bg-blue-600 focus:bg-blue-600 ">
                      Open this select menu
                    </option>
                    <option value="Favourite Sport">Favourite Sport</option>
                    <option value="Favourite Food">Favourite Food</option>
                    <option value="Favourite City To Visit">
                      Favourite City To Visit
                    </option>
                  </select>
                </div>
                {/*  */}
                <div className="mb-3">
                  <label
                    htmlFor="forgetAns"
                    className="block text-gray-800 text-base sm:text-lg font-medium sm:font-bold mb-1"
                  >
                    Answer{" "}
                  </label>
                  <input
                    type="text"
                    className="shadow border rounded-md sm:rounded-lg w-full py-2 px-1 sm:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-gray-400"
                    placeholder="Type answer here..."
                    id="forgetAns"
                    name="forgetAns"
                    value={credentials.forgetAns}
                    onChange={(e) => onChange(e, "forgetAns")}
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>

              <div className="mt-10 xl:mt-16">
                <button
                  type="submit"
                  className="bg-cyan-700 hover:bg-cyan-900 text-white px-1 md:px-2 py-2 text-base sm:text-lg font-semibold  hover:border-2 hover:border-white hover:outline hover:outline-cyan-900 rounded-lg w-full xl:mx-auto"
                >
                  SignUp
                </button>
              </div>
              <div className="h-[1px] bg-blue-900/25 my-5" />
              <div className="mb-3 text-center ">
                <div id="emailHelp" className="form-text center my-3">
                  Already have an account ?
                </div>
                <div className="d-grid gap-2 my-3 col-6 mx-auto">
                  <button
                    onClick={goToLogin}
                    className="bg-cyan-700 hover:bg-cyan-900 text-white px-2 py-2 text-base sm:text-lg font-semibold  hover:border-2 hover:border-white hover:outline hover:outline-cyan-900 rounded-lg"
                  >
                    Login Here!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
