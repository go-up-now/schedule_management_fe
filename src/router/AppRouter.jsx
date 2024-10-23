import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "../pages/Dashboard.tsx"
import NotFound from "../pages/NotFound.jsx"
import StudentManagePage from "../pages/accountManagement/students/StudentManagePage.tsx"
import ClazzManagementPage from "../pages/clazzManagement/ClazzManagementPage.tsx"
import CourseRegistrationPage from "../pages/schedule/index.tsx"

const AppRouters = () => {
    return (
        <>
            <Routes>
                {/* {isAuthenticated() && getUserScope() ? ( */}
                <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/sinh-vien" element={<StudentManagePage />} />
                    <Route path="/lop-hoc" element={<ClazzManagementPage />} />
                    <Route path="/dang-ky-mon-hoc" element={<CourseRegistrationPage />} />
                    <Route path="*" element={<NotFound />} />
                </>
                {/* ) : (
                    <Route path="*" element={<Navigate to="/dang-nhap" replace />} />
                )} */}
            </Routes>
        </>
    )
}

export default AppRouters;