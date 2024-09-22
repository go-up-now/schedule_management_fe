import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import NotFound from "../pages/NotFound"

const AppRouters = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
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