import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import Navbar from './components/sidebar/Navbar.jsx';
import { useLocation } from "react-router-dom";
import AppRouters from "./router/AppRouter.jsx";
import LoginRouter from "./router/LoginRouter.jsx";
import { ToastContainer } from 'react-toastify';

function App() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === "/dang-nhap";

  return (
    <div className="relative min-h-screen">
      {isLoginPage ? (<LoginRouter />)
        :
        <>
          {/* <Sidemenu />   */}
          < Sidebar setExpand={setSideMenuIsExpand} />
          {/* content */}
          <div
            className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
              }`}
          >
            <Navbar />
            <div className="ms-2">
              <AppRouters />
            </div>
          </div>
        </>
      }
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      // transition:Bounce,
      />
    </div>
  );
}

export default App;
