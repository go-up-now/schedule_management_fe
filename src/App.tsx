import React, { useState } from "react";
import './style.css';
import Sidebar from "./components/sidebar/Sidebar.tsx";
import Navbar from './components/sidebar/Navbar.js';
import { BrowserRouter } from "react-router-dom";
import AppRouters from "./router/AppRouter.js";

function App() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen md:flex">
        {/* <Sidemenu />   */}
        <Sidebar setExpand={setSideMenuIsExpand} />
        {/* content */}
        <div
          className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
            }`}
        >
          <Navbar />
          <AppRouters />
        </div>
      </div>
    </BrowserRouter>

    // <div className="bg-slate-50">
    //   <div className="relative w-full max-w-7xl mx-auto md:flex">
    //     {/* sidemenu */}
    //     <Sidebar setExpand={setSideMenuIsExpand} />
    //     {/* content */}
    //     <div
    //       className={`flex-1 min-h-screen mx-0 transition-all duration-300 ease-in-out`}
    //     >
    //       <Blog />
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
