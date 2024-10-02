import React, { useState, useEffect } from "react";
import InputColor from "../components/inputs/InputColor";
import { handleLoginAPI } from "../services/userService";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async () => {
        console.log("check login: ", email, password)
        try {
            if (!email || !password) {
                toast.error('Vui lòng nhập đầy đủ thông tin!')
                return;
            }
            let data = await handleLoginAPI(email, password)
            console.log("check api: ", data)
            if (data && data.data.code !== 200) {
                toast.error(data.data.message)
            } if (data && data.code === 200) {

                localStorage.setItem("token", data.data.token)
                navigate('/')
                toast.success("Chào mừng bạn đến với Schedule Management App")
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error("Đã xảy ra lỗi khi đăng nhập");
            }
        }
    }

    return (
        <section className="h-full bg-neutral-200 dark:bg-neutral-700">
            <div className="h-full">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white dark:bg-neutral-800">
                            <div className="g-0 lg:flex lg:flex-wrap items-center justify-center h-screen">
                                {/* <!-- Left column container--> */}
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12 m-auto">
                                        {/* <!--Logo--> */}
                                        <div className="text-center">
                                            <img
                                                className="mx-auto w-48"
                                                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                alt="logo"
                                            />
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                                Quản lý lịch học
                                            </h4>
                                        </div>

                                        <form>
                                            {/* <!--Username input--> */}
                                            <InputColor
                                                type="text"
                                                title="Email"
                                                className="mb-4"
                                                onchange={(event) => handleEmail(event)}
                                            ></InputColor>
                                            <br />
                                            {/* <!--Password input--> */}
                                            <InputColor
                                                type="password"
                                                title="Mật khẩu"
                                                className="mb-4"
                                                onchange={(event) => handlePassword(event)}
                                            ></InputColor>

                                            {/* <!--Submit button--> */}
                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <button
                                                    className="mt-4 mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                    type="button"
                                                    style={{
                                                        background:
                                                            "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                                    }}
                                                    onClick={handleLogin}
                                                >
                                                    Log in
                                                </button>

                                                {/* <!--Forgot password link--> */}
                                                <a href="#!">Quên mật khẩu?</a>
                                            </div>

                                            {/* <!--Register button--> */}
                                            {/* <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <TERipple rippleColor="light">
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            Register
                          </button>
                        </TERipple>
                      </div> */}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}