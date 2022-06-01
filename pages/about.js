import React,{useState,useEffect} from "react";
import { useRouter } from "next/router";

const About = ({usertoken}) => {

  let username = "Guest";
  const router = useRouter();

  

  function parseJwt(token) {
    //console.log("us = ",token)
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  let userdetails = {}
  
  //console.log("usertoken in about =",usertoken)
  try{
    if(usertoken.value != null){
    console.log("us = ",usertoken)
    userdetails = parseJwt(usertoken.value);
    username = userdetails.name;
  }
  else {
    username="Guest"
  }
}
  catch(err){
    console.log(err)
  }
  //console.log("parsed = ", userdetails);

  return (
    <>
      {username !== "Guest" ? (
        <section className="text-gray-200 bg-gradient-to-l from-blue-600 to-indigo-900 body-font h-screen">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                Visit Your Profile Here
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base xl:text-xl">
                JSON Web Token (JWT) is an open standard (RFC 7519) that defines
                a compact and self-contained way for securely transmitting
                information between parties as a JSON object. This information
                can be verified and trusted because it is digitally signed. JWTs
                can be signed using a secret (with the HMAC algorithm) or a
                public/private key pair using RSA or ECDSA.
              </p>
            </div>
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full ">
                <div className="border-2 border-white px-4 py-6 rounded-lg hover:bg-black/10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="text-yellow-400 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 17l4 4 4-4m-4-5v9"></path>
                    <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-white">
                  {userdetails && userdetails.name}
                  </h2>
                  <p className="leading-relaxed">My Name</p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-white px-4 py-6 rounded-lg hover:bg-black/10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="text-yellow-400 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-white">
                  {userdetails && userdetails.email}
                  </h2>
                  <p className="leading-relaxed">My Email</p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-white px-4 py-6 rounded-lg hover:bg-black/10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="text-yellow-400 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-white capitalize">
                  {userdetails && userdetails.role}

                  </h2>
                  <p className="leading-relaxed">My Role</p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-white px-4 py-6 rounded-lg hover:bg-black/10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="text-yellow-400 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-white">
                  {userdetails && userdetails.name}
                  </h2>
                  <p className="leading-relaxed">My Fav</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="bg-gradient-to-l from-blue-600 to-indigo-900 w-full p-5 xl:p-10 h-screen">
          <div className="p-4 flex items-center justify-center flex-col xl:flex-row border-2  rounded-3xl drop-shadow-lg">
            <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl text-white w-full text-center">
              Oops ! You have to login first to see your profile :({" "}
            </h1>
            <img src="badrequest.png" className="xl:w-3/5" alt="bad_request" />
          </div>
        </div>
      )}
    </>
  );
};

export default About;
