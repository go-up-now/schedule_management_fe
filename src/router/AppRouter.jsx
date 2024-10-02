import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "../pages/Dashboard.tsx"
import NotFound from "../pages/NotFound.jsx"
import StudentManagePage from "../pages/StudentManagePage.tsx"
import CourseRegistrationPage from "../pages/schedule/index.tsx"
import Login from "../pages/Login.tsx"

const AppRouters = () => {
    const token = localStorage.getItem("token");
    return (
        <>
            <Routes>
                {!token ? (
                    <Route path="*" element={<Navigate to="/dang-nhap" replace />} />
                ) : (
                    <>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/sinh-vien" element={<StudentManagePage />} />
                        <Route path="/dang-ky-mon-hoc" element={<CourseRegistrationPage />} />
                        <Route path="*" element={<NotFound />} />
                    </>
                )}
            </Routes>
        </>
    )
}

export default AppRouters;