import Head from "next/head";
import { useRouter } from "next/router";

export default function Home({usertoken}) {
 
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Authlogin Boilerplate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <div className="md:p-5 xl:p-20 bg-gradient-to-l h-screen from-blue-600 to-indigo-900">
          <div className="pt-3 md:pt-5 lg:pt-10">
            <div className="container px-3 mx-auto flex flex-wrap flex-col md:px-0 md:w-full xl:flex-row items-center justify-end">
              {/* Left col */}
              <div className="flex flex-col w-full justify-center items-start md:w-4/5 md:text-left xl:w-2/5 text-white ">
                  
                <h1 className="my-4 text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight font-Dancing">
                  Welcome To Authlogin !
                </h1>
                <p className="leading-normal text-base text-justify md:text-lg lg:text-xl xl:text-2xl mb-4 md:mb-6 lg:mb-8 selection:bg-yellow-100 selection:text-green-800">
                JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.
                </p>
                <button
                  className="mx-auto lg:mx-0 border-2 my-2 py-2 px-3 text-base md:text-lg md:px-6 md:py-4 lg:my-6 lg:py-4 lg:px-8 lg:text-xl
                 hover:underline hover:bg-blue-900 bg-blue-600 text-white font-bold rounded-full  shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer"
                  onClick={() => router.push("/about")}
                >
                  See Profile
                </button>
              </div>
              {/* Right COl */}
              <div className="w-full md:w-3/5 py-6 text-center">
                <img
                  className="w-full md:w-5/5 xl:w-4/5 xl:ml-[200px] z-50"
                  src='hero.png'
                  alt="right_img"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
