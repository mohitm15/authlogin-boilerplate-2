import React, { useState } from "react";
import { useRouter } from "next/router";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';


const Changepassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfmPassword, setShowConfmPassword] = useState(false);

  const [newCredentials, setNewCredentials] = useState({
    email: "",
    newPassword: "",
    confmNewPassword: "",
  });

  const onChange = (e) => {
    setNewCredentials({
      ...newCredentials,
      [e.target.name]: e.target.value,
    });
  };

  //console.log(newCredentials);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/changepassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newCredentials.email,
        newPassword: newCredentials.newPassword,
        confmNewPassword: newCredentials.confmNewPassword,
      }),
    });

    const json = await response.json();
    //console.log(json)

    if (json.success === true) {
      localStorage.setItem("authToken", json.authToken);
      toast.success('Password Changed SuccessFully !', {
        style: {
          border: '2px solid green',
          padding: '16px',
          color: 'green',
          backgroundColor: '#A6F987',
          fontWeight:'800',
          
        },
        iconTheme: {
          primary: 'green',
          secondary: '#FFFAEE',
        },
      });
      router.push("/login");
    } else {
      toast.error('Error ! Password Change Failed', {
        style: {
          border: '2px solid #9F1A11',
          padding: '16px',
          color: '#9F1A11',
          backgroundColor: '#FAADA9',
          fontWeight:'800',
          
        },
        iconTheme: {
          primary: '#9F1A11',
          secondary: '#FFFAEE',
        },
      });
    }
  };

  const backToForgot = () => {
    router.push("/forgotpassword");
  };

  function togglePasswordVisibilty() {
    setShowPassword(!showPassword ? true : false);
  }

  function toggleConfmPasswordVisibilty() {
    setShowConfmPassword(!showConfmPassword ? true : false);
  }
  return (
    <>
      <div className=" p-1 flex flex-row item-center w-full justify-center">
        <Toaster />
        <div
          id="loginbody"
          className="sm:p-5 mt-5 lg:mt-14 border-2 border-blue-900 rounded-xl bg-blue-200"
        >
          <div className="m-3">
            <h2 className="my-3 text-2xl font-medium sm:text-4xl lg:text-5xl xl:text-6xl text-center">
              Change Password
            </h2>
            <form className="login-form p-2 sm:p-5" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="block text-gray-800 ext-base sm:text-lg font-medium sm:font-bold mb-2"
                >
                  Enter Email Again
                </label>
                <input
                  type="email"
                  className="shadow border rounded-md sm:rounded-lg w-full py-2 px-1 sm:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-gray-400"
                  placeholder="Type email again here..."
                  id="email"
                  name="email"
                  value={newCredentials.email}
                  aria-describedby="emailHelp"
                  onChange={onChange}
                />
                <div
                  id="emailHelp"
                  className="form-text text-xs sm:text-sm py-1 font-extralight sm:pl-3"
                >
                  We will never share your email with anyone else.
                </div>
              </div>


              <div className="mb-3">
                <div className="flex  flex-col sm:items-baseline">
                  <label
                    htmlFor="password"
                    className="block text-gray-800 text-base sm:text-lg font-medium sm:font-bold mb-2 w-2/5"
                  >
                    New Password
                  </label>
                  <span className="flex flex-row items-center  bg-white rounded-md px-1 sm:px-3  w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="shadow appearance-none border border-red-500 rounded-md sm:rounded-lg w-full py-2 px-1 sm:px-3 text-gray-700  leading-tight focus:border-sky-700 focus:shadow-outline placeholder:italic placeholder:text-gray-400"
                      placeholder="Type password here..."
                      id="newPassword"
                      name="newPassword"
                      minLength={5}
                      value={newCredentials.newPassword}
                      onChange={(e) => onChange(e, "newPassword")}
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
                <div className="flex flex-col sm:items-baseline">
                  <label
                    htmlFor="confmNewPassword"
                    className="block text-gray-800 text-base sm:text-lg font-medium sm:font-bold mb-2 xl:w-3/5"
                  >
                    Confirm New Password
                  </label>
                  <span className="flex flex-row items-center  bg-white rounded-md px-1 sm:px-3  w-full">
                    <input
                      type={showConfmPassword ? "text" : "password"}
                      className="shadow appearance-none border border-red-500 rounded-md sm:rounded-lg w-full py-2 px-1 sm:px-3 text-gray-700 leading-tight focus:border-sky-700 focus:shadow-outline placeholder:italic placeholder:text-gray-400"
                      placeholder="Confirm password here..."
                      id="confmNewPassword"
                      name="confmNewPassword"
                      value={newCredentials.confmNewPassword}
                      onChange={(e) => onChange(e, "confmNewPassword")}
                      minLength={5}
                      required
                      style={{ border: 0, outline: "none" }}
                    />
                    {showConfmPassword ? (
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
              <div className="gap-2 mt-4 xl:mt-8 col-6 mx-auto">
                <button
                  type="submit"
                  className="bg-cyan-700 hover:bg-cyan-900 text-white px-2 py-2 text-base sm:text-lg font-semibold  hover:border-2 hover:border-white hover:outline hover:outline-cyan-900 rounded-lg w-full"
                >
                  Change Password
                </button>
              </div>
              <div className="h-[1px] bg-blue-900/25 my-5" />

              <div className="mb-3 text-center">
                <div id="emailHelp" className="form-text center my-3">
                  Want to go back ?
                </div>
                <div className="d-grid gap-2 my-3 col-6 mx-auto">
                  <button
                    onClick={backToForgot}
                    className="bg-cyan-700 hover:bg-cyan-900 text-white px-2 py-2 text-base sm:text-lg font-semibold  hover:border-2 hover:border-white hover:outline hover:outline-cyan-900 rounded-lg"
                  >
                    Back
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

export default Changepassword;
