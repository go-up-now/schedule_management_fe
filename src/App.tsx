import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import Navbar from './components/sidebar/Navbar.jsx';
import { useLocation } from "react-router-dom";
import AppRouters from "./router/AppRouter.jsx";
import LoginRouter from "./router/LoginRouter.jsx";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserScope, getRole } from './utilss/authUtils.ts'
import { useDispatch } from 'react-redux';
import { STUDENT_ROLE, ADMIN_ROLE, INSTRUCTOR_ROLE } from './constants/roleConstants.ts';
import { getStudentMyInforAPI } from "./services/StudentService.js";
import { getMyInforAPI } from "./services/userService.js";
import { getInstructorMyInforAPI } from "./services/instructorService.js";
import { setUser } from './reducers/userSlice.tsx';

function App() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  const [loading, setLoading] = useState(0);
  const location = useLocation();
  const isLoginPage = location.pathname === "/dang-nhap";
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated() && getUserScope()) {
      if (loading <= 2)
        checkRole();
    }
    else {
      navigate("/dang-nhap");
    }
  }, [navigate]);

  const checkRole = async () => {
    let userData;
    if (getRole(STUDENT_ROLE)) {
      userData = await getStudentMyInforAPI();
    }
    else if (getRole(ADMIN_ROLE)) {
      userData = await getMyInforAPI();
    }
    else if (getRole(INSTRUCTOR_ROLE)) {
      userData = await getInstructorMyInforAPI();
    }
    dispatch(setUser({
      userInfo: userData.data,
    }));
    setLoading(loading + 1)
  }

  return (
    <div className="relative min-h-screen zoom-90">
      {
        isLoginPage ? (<LoginRouter />)
          :
          <>
            {/* <Sidemenu />   */}
            < Sidebar setExpand={setSideMenuIsExpand} />
            {/* content */}
            <div
              className={`flex-1 min-h-screen mx-0 bg-slate-100 `}
            >
              <Navbar />
              <div className={`ms-2 transition-all
               duration-300 ease-in-out ${sideMenuIsExpand ? "md:ml-72" : "md:ml-20"}`}>
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
