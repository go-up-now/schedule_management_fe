import InputColor from "../components/inputs/InputColor.tsx";
// import TableIndex from "../components/tables/TableIndex.js";
import Tables from "../components/tables/Tables.tsx";
import SelectBox from "../components/SelectBox.tsx";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    interface User {
        id: number;
        name: string;
        email: string;
        age: number;
    }
    let navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         navigate('/dang-nhap');  // Điều hướng về trang đăng nhập nếu chưa có token
    //     }
    // }, [navigate]);

    const usersData: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', age: 23 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 23 },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', age: 23 }
    ];
    const renderUserRow = (user: User): React.ReactNode[] => {
        return [
            <td key={user.id}>{user.id}</td>,
            <td key={user.name}>{user.name}</td>,
            <td key={user.email}>{user.email}</td>,
            <td key={user.age}>{user.age}</td>
        ];
    };

    return (
        <>
            <h1>Đây là trang Dashboard</h1>
            <InputColor
                title='Username'
                type='text'
                placeholder="matkhau"
            />
            {/* <TableIndex /> */}
            <SelectBox
                name="cbbDemoDate"
                options={[{ value: '', label: 'Công nghệ thông tin' }, { value: '', label: 'Ứng dụng phần mềm' }]}
                disableDefaultOption={true}
                customClassName="mx-2"
            >
            </SelectBox> chọn Bộ môn muốn đăng ký.

            <Tables headers={['Học kỳ', 'Block', 'Ngày bắt đầu', 'Ngày kết thúc', '']} 
            loading={false} data={usersData} maxRow={10} renderRow={renderUserRow} />
        </>
    )
}

export default Dashboard;