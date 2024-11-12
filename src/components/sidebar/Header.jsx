import { useSelector } from 'react-redux';
import avatar from '../../assets/avatar-user.jpg';
import { useNavigate } from 'react-router-dom';
import 'flowbite';

function Header() {
  const userInfo = useSelector((state) => state.user.userInfo);  // Lấy thông tin người dùng từ Redux

  const navigate = useNavigate();

  const handleSignOut = () => {
    // Xoá token đăng nhập khỏi localStorage
    // localStorage.removeItem('token');

    // Điều hướng đến trang đăng xuất
    navigate('/dang-xuat');
  };
  return (
    // <div className="sticky top-0 left-0 w-full bg-white z-50">
    //   <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0 "></div>
    //   <div className="bg-white">
    //     <div className="flex-col flex">
    //       <div className="w-full border-b-2 border-gray-200">
    //         <div className="bg-white h-16 justify-between items-center mx-auto px-4 flex">
    //           <div>
    //             <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
    //               className="block btn- h-20 w-auto" alt="" />
    //           </div>
    //           <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
    //             <div className="relative">
    //               <p className="pt-1 pr-1 pb-1 pl-1 bg-white text-gray-700 rounded-full transition-all duration-200
    //               hover:text-gray-900 focus:outline-none hover:bg-gray-100">
    //                 <span className="justify-center items-center flex">
    //                   <span className="justify-center items-center flex">
    //                     <span className="items-center justify-center flex">
    //                       <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    //                         stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round"
    //                           d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4
    //                       0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6
    //                       0H9"/></svg>
    //                     </span>
    //                   </span>
    //                 </span>
    //               </p>
    //               <p className="px-1.5 py-0.5 font-semibold text-xs items-center bg-indigo-600 text-white rounded-full inline-flex
    //               absolute -top-px -right-1">2</p>
    //             </div>
    //             <div className="justify-center items-center flex relative">
    //               <p className="font-semibold text-sm mr-2">
    //                 {userInfo && userInfo.user ? (
    //                   <>
    //                     Xin chào, {userInfo.user.firstName}
    //                   </>
    //                 ) : (
    //                   userInfo ?
    //                     <>
    //                       Xin chào, {userInfo.firstName}
    //                     </>
    //                     : "please login"
    //                 )}
    //               </p>
    //               <img src="https://static01.nyt.com/images/2019/11/08/world/08quebec/08quebec-superJumbo.jpg"
    //                 className="object-cover btn- h-9 w-9 rounded-full bg-gray-300" alt="" />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              {/* <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6" aria-hidden="true" fill="currentColor">
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
            <a href="http://localhost:3000/" className="flex ms-2 md:me-24">
              <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" className="h-10 me-3 w-auto scale-logo" alt="Schedule Management Logo" />
            </a>
          </div>

          <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3 mr-3">
            <div className="relative">
              <p className="pt-1 pr-1 pb-1 pl-1 bg-white text-gray-700 rounded-full transition-all duration-200
                hover:text-gray-900 focus:outline-none hover:bg-gray-100">
                <span className="justify-center items-center flex">
                  <span className="justify-center items-center flex">
                    <span className="items-center justify-center flex">
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4
                          0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6
                          0H9"/></svg>
                    </span>
                  </span>
                </span>
              </p>
              <p className="px-1.5 py-0.5 font-semibold text-xs items-center bg-indigo-600 text-white rounded-full inline-flex
                  absolute -top-px -right-1">2</p>
            </div>
          </div>

          <div className="flex items-center ">
            <p className="font-semibold text-sm ">
              {userInfo && userInfo.user ? (
                <>
                  Xin chào, {userInfo.user.lastName + ' ' + userInfo.user.firstName}
                </>
              ) : (
                userInfo ?
                  <>
                    Xin chào, {userInfo.lastName + ' ' + userInfo.firstName}
                  </>
                  : "please login"
              )}
            </p>
            <div className="flex items-center ms-3">

              <div>
                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-10 h-10 rounded-full" src={
                    userInfo && userInfo.user ? (
                      userInfo.user.avatar ? userInfo.user.avatar : avatar
                    ) : (
                      userInfo ?
                        userInfo.avatar ? userInfo.avatar : avatar
                        : avatar
                    )
                  } alt="user photo" />
                </button>
              </div>
              <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                <ul className="px-4 py-3" role="none">
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Thông tin cá nhân</a>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

  );
}

export default Header;