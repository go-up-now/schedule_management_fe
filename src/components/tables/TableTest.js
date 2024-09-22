import React, { useState } from 'react';

const TableTest = () => {
    const data = [
        { id: 1, maGV: 'Anv123456', hoGiangVien: 'Nguyễn Văn', tenGiangVien: 'An', boMonGiangDay: 3, diemHoatDong: 10, trangThai: 100 },
        { id: 2, maGV: 'Anv123456', hoGiangVien: 'Nguyễn Văn', tenGiangVien: 'An', boMonGiangDay: 3, diemHoatDong: 10, trangThai: 100 },
        { id: 3, maGV: 'Anv123456', hoGiangVien: 'Nguyễn Văn', tenGiangVien: 'An', boMonGiangDay: 3, diemHoatDong: 10, trangThai: 100 },
        // Add more data rows as needed
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">STT</th>
                        <th className="px-4 py-2">Mã GV</th>
                        <th className="px-4 py-2">Họ giảng viên</th>
                        <th className="px-4 py-2">Tên giảng viên</th>
                        <th className="px-4 py-2">Bộ môn giảng dạy</th>
                        <th className="px-4 py-2">Điểm hoạt động</th>
                        <th className="px-4 py-2">Trạng thái</th>
                        <th className="px-4 py-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id} className="text-center border-b">
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{item.maGV}</td>
                            <td className="px-4 py-2">{item.hoGiangVien}</td>
                            <td className="px-4 py-2">{item.tenGiangVien}</td>
                            <td className="px-4 py-2 text-red-500">{item.boMonGiangDay}</td>
                            <td className="px-4 py-2 text-green-500">{item.diemHoatDong}</td>
                            <td className="px-4 py-2 text-blue-500">{item.trangThai}</td>
                            <td className="px-4 py-2">
                                <div className="flex items-center">
                                    <button
                                        onClick={handleMenuClick}
                                        className="ml-4 text-gray-500 hover:bg-gray-600 "
                                    >
                                        ...
                                    </button>
                                    {isMenuOpen && (
                                        <div className="absolute right-0 mt-2 bg-white shadow-md rounded">
                                            <div className="flex items-center px-4 py-2">
                                                {/* Icon bên trái */}
                                                <div className="mr-2">{/* Ví dụ: Icon bút chì */}</div>
                                                <span>Edit</span>
                                            </div>
                                            <div className="flex items-center px-4 py-2">
                                                {/* Icon bên trái */}
                                                <div className="mr-2">{/* Ví dụ: Icon cập nhật */}</div>
                                                <span>Update</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableTest;
