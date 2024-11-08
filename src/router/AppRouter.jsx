import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "../pages/Dashboard.tsx"
import NotFound from "../pages/NotFound.jsx"
import StudentManagePage from "../pages/accountManagement/students/StudentManagePage.tsx"
import ClazzManagementPage from "../pages/clazzManagement/ClazzManagementPage.tsx"
import CourseRegistrationPage from "../pages/schedule/index.tsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import { getUserScope } from '../utilss/authUtils.ts'
import { ROLE } from '../enum/Role.tsx'
import ScheduleStudyPage from "../pages/schedule/ScheduleStudy/ScheduleStudyPage.tsx"
import LearningHistoryPage from "../pages/learningOutComes/LearningHistoryPage.tsx"
import HelpPageIndex from "../pages/help/HelpPageIndex.tsx"

const AppRouters = () => {
    const userRoles = getUserScope() ?? ROLE.STUDENT;
    return (
        <>
            <Routes>
                {/* {isAuthenticated() && getUserScope() ? ( */}
                <>
                    {/* ADMIN, INSTRUCTOR, STUDENT */}
                    <Route path="/" element={<ProtectedRoute element={<Dashboard />} roles={[ROLE.ADMIN, ROLE.INSTRUCTOR, ROLE.STUDENT]} userRoles={userRoles} />} />
                    <Route path="/ho-tro" element={<ProtectedRoute element={<HelpPageIndex />} roles={[ROLE.ADMIN, ROLE.INSTRUCTOR, ROLE.STUDENT]} userRoles={userRoles} />} />

                    {/* ADMIN */}
                    <Route path="/sinh-vien" element={<ProtectedRoute element={<StudentManagePage />} roles={[ROLE.ADMIN]} userRoles={userRoles} />} />
                    <Route path="/lop-hoc" element={<ProtectedRoute element={<ClazzManagementPage />} roles={[ROLE.ADMIN]} userRoles={userRoles} />} />

                    {/* STUDENT */}
                    <Route path="/dang-ky-mon-hoc" element={<ProtectedRoute element={<CourseRegistrationPage />} roles={[ROLE.STUDENT]} userRoles={userRoles} />} />
                    <Route path="/lich-hoc" element={<ProtectedRoute element={<ScheduleStudyPage />} roles={[ROLE.STUDENT]} userRoles={userRoles} />} />
                    <Route path="/lich-su-hoc-tap" element={<ProtectedRoute element={<LearningHistoryPage />} roles={[ROLE.STUDENT]} userRoles={userRoles} />} />

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