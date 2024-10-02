import { Routes, Route } from "react-router-dom"
import Login from "../pages/Login.tsx"

const LoginRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/dang-nhap" element={<Login />} />
            </Routes>
        </>
    )
}

export default LoginRouter;