import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import {  useRouter } from "next/router";

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const [usertoken, setUsertoken] = useState({ value: null });

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken != null) {
      setUsertoken({ value: authToken });
    }
    //router.push("/");
  }, [router.query]);

  //console.log("usertokem.valuer = ", usertoken.value)
  const logout = () => {
    localStorage.removeItem("authToken");
    // toast.success("Logged Out Successfully !", {
    //   position: "top-right",
    //   autoClose: 1500,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: false,
    //   draggable: true,
    //   progress: undefined,
    // });
    // setTimeout(() => {
    //   router.push("/");
    // }, 2500);
    setUsertoken({ value: null });
  };

  return (
    <>
      <Navbar usertoken={usertoken} logout={logout} />
      <div className='bg-gradient-to-l from-blue-600 to-indigo-900 h-screen '>
      <Component usertoken={usertoken} {...pageProps}  />
      </div>
    </>
  );
}

export default MyApp;
