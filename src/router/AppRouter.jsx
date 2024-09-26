import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard.tsx"
import NotFound from "../pages/NotFound.jsx"
import StudentManagePage from "../pages/StudentManagePage.tsx"
import CourseRegistrationPage from "../pages/schedule/index.tsx"

const AppRouters = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/sinh-vien" element={<StudentManagePage />} />
                <Route path="/dang-ky-mon-hoc" element={<CourseRegistrationPage />} />
                <Route path="/*" element={<NotFound />} />
                {/* <Route
                    path="/users"
                    element={
                        <PrivateRoutes>
                            <TableUser />
                        </PrivateRoutes>
                    }
                /> */}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </>
    )
}

export default AppRouters;