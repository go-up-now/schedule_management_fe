import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const LogoutPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        navigate('/dang-nhap');
    }, [navigate]);

    return <div className="flex justify-center gap-5 items-center min-h-screen">
        <Spinner className="w-55 h-55" />
        <span className="text-gray-500 text-xl">Đang đăng xuất...</span>
    </div>;
};

export default LogoutPage;