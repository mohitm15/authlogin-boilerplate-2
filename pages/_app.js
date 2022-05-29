import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className='bg-gradient-to-l from-blue-600 to-indigo-900 h-screen '>
      <Component {...pageProps}  />
      </div>
    </>
  );
}

export default MyApp;
