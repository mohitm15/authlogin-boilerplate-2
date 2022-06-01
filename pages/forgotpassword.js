import React, { useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from 'react-hot-toast';

const Forgotpassword = () => {
  const router = useRouter();

  const [forgotCredentials, setForgotCredentials] = useState({
    email: "",
    forgetQues: "",
    forgetAns: "",
  });

  const onChange = (e) => {
    setForgotCredentials({
      ...forgotCredentials,
      [e.target.name]: e.target.value,
    });
    //console.log(forgotCredentials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgotpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: forgotCredentials.email,
        forgetQues: forgotCredentials.forgetQues,
        forgetAns: forgotCredentials.forgetAns,
      }),
    });
    const json = await response.json();
    // console.log(json)

    if (json.success === true) {
      //navigating to the changePassword endpoint
      toast.success('User Selected Correct Credentials !', {
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
      router.push("/changepassword");
    } else {
      toast.error('Incorrect Choice Selected ! Please Try Again', {
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

  const backToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <div className=" xl:flex  xl:justify-center mx-auto p-10 ">
        <Toaster />
        <div
          id="loginbody"
          className="sm:p-5 mt-10 border-2 border-blue-900 rounded-xl bg-blue-200 h-auto"
        >
          <div className="m-3">
            <h2 className="my-3 text-2xl font-medium sm:text-4xl lg:text-5xl xl:text-6xl text-center">
              Forgot Password
            </h2>
            <form className="login-form p-2 sm:p-5" onSubmit={handleSubmit}>
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
                  value={forgotCredentials.email}
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

              <div className="mb-3 row">
                <div className="form-floating col-6 ">
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
                    value={forgotCredentials.forgetQues}
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
              </div>
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
                    value={forgotCredentials.forgetAns}
                    onChange={(e) => onChange(e, "forgetAns")}
                    aria-describedby="emailHelp"
                  />
                </div>

              <div className="d-grid gap-2 mt-4 xl:mt-10 col-6 mx-auto">
                <button
                  type="submit"
                  className="bg-cyan-700 hover:bg-cyan-900 text-white px-2 py-2 text-base sm:text-lg font-semibold  hover:border-2 hover:border-white hover:outline hover:outline-cyan-900 rounded-lg w-full"
                  //onClick={handleSubmit}
                >
                  Confirm Details
                </button>
              </div>
              <div className="h-[1px] bg-blue-900/25 my-5" />
              <div className="mb-3 text-center">
                <div id="emailHelp" className="form-text center my-3">
                  Remembered your password ?
                </div>
                <div className="d-grid gap-2 my-3 col-6 mx-auto">
                  <button
                    onClick={backToLogin}
                    className="bg-cyan-700 hover:bg-cyan-900 text-white px-3 py-1 text-base sm:text-lg font-semibold  hover:border-2 hover:border-white hover:outline hover:outline-cyan-900 rounded-lg"
                  >
                    Login Again !
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

export default Forgotpassword;
