import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, roles, userRoles }) => {
    // Kiểm tra xem người dùng có quyền truy cập không
    const hasAccess = roles.some(role => userRoles.includes(role));

    return hasAccess ? element : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;