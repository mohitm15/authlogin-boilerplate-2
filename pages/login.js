import React, { useState } from "react";
import { useRouter } from "next/router";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Login = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log("resp from login ui= ",json);

    if (json.success === true) {
      //storing the authtoken
      localStorage.setItem("authToken", json.authToken);
      //props.showAlert("User logged in successfully", "info");
      router.push("/");
    } else {
      //props.showAlert("Invalid Credentials", "danger");
    }
  };

  const togglePasswordVisibilty = () => {
    setShowPassword(!showPassword ? true : false);
  };

  const goToSignUp = () => {
    router.push("/signup");
  };

  const goToForgotPassword = () => {
    router.push("/forgotpassword");
  };

  return (
    <>
      <div className="w-full xl:flex xl:items-center xl:justify-center mx-auto ">
        <div
          id="loginbody"
          className="sm:p-2 sm:border-2 sm:mt-10 border-blue-900 rounded-xl bg-blue-200 lg:w-5/6 flex xl:flex-row item-center justify-center "
        >
          {/* left col */}
          <div className="hidden xl:block">
            <img
              src="badrequest.png"
              alt="imagebadrequest"
              className="w-97 h-97 m-auto"
            />
          </div>
          {/* right col */}
          <div className="sm:p-5 xl:bg-blue-100 border-none xl:shadow-2xl xl:shadow-sky-800 sm:w-4/5 lg:w-3/5 rounded-3xl">
            <h2 className="my-3 text-2xl font-medium sm:text-4xl lg:text-5xl xl:text-6xl text-center">
              Login Here
            </h2>
            <form
              className="login-form p-2 sm:p-5 w-full "
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="block text-gray-800 ext-base sm:text-lg font-medium sm:font-bold mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="shadow border rounded-md sm:rounded-lg w-full py-2 px-1 sm:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-gray-400"
                  placeholder="Type email here..."
                  id="email"
                  name="email"
                  value={credentials.email}
                  aria-describedby="emailHelp"
                  onChange={onChange}
                />
                <div id="emailHelp" className="form-text text-xs sm:text-sm py-1 font-extralight sm:pl-3">
                  We will never share your email with anyone else.
                </div>
              </div>
              <div className="mb-5">
                <div className="flex flex-col sm:items-baseline">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="block text-gray-800 text-base sm:text-lg font-medium sm:font-bold mb-2"
                  >
                    Password
                  </label>
                  <span className="flex flex-row items-center  bg-white rounded-md px-1 sm:px-3  w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="shadow appearance-none border border-red-500 rounded-md sm:rounded-lg w-full py-2 text-gray-700 leading-tight focus:border-sky-700 focus:shadow-outline placeholder:italic placeholder:text-gray-400"
                      id="password"
                      name="password"
                      placeholder="Type password here...  "
                      value={credentials.password}
                      onChange={onChange}
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
              <div className="flex flex-col space-y-2 xl:space-y-4 xl:mt-20 xl:mb-10">
                <button
                  type="submit"
                  className="bg-cyan-700 hover:bg-cyan-900 text-white px-1 md:px-2 py-2 text-base sm:text-lg font-semibold  hover:border-2 hover:border-white hover:outline hover:outline-cyan-900 rounded-lg xl:w-3/5 xl:mx-auto"
                >
                  Login
                </button>
                <button
                  onClick={goToForgotPassword}
                  className="bg-cyan-700 hover:bg-cyan-900 text-white px-1 md:px-2 py-2 text-base sm:text-lg font-semibold  hover:border-2 hover:border-white hover:outline hover:outline-cyan-900 w-full rounded-lg xl:w-3/5 xl:mx-auto"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="h-[1px] bg-blue-900/25 my-5" />
              <div className="mb-3 text-center">
                <div id="emailHelp" className="form-text center my-3">
                  Did not have an account ?
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    onClick={goToSignUp}
                    className="bg-cyan-700 hover:bg-cyan-900 text-white px-1 md:px-2 py-2 text-base sm:text-lg font-semibold  hover:border-2 hover:border-white hover:outline hover:outline-cyan-900 rounded-lg"
                  >
                    SignUp Here !
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

export default Login;
