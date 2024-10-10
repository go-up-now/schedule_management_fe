import React, { useState, useEffect } from "react";
import TitleHeader from "../../components/TitleHeader.tsx";
import Button from "../../components/Button.tsx";
import SelectBox from "../../components/SelectBox.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tables from "../../components/tables/Tables.tsx";
import CardBox from "../../components/CartBox.tsx";
import { faEllipsis, faFile, faFileExport, faPlus, faUserCheck, faUserGroup, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { FetchAll } from "../../services/StudentService.js";
import useHoverModal from "../../hooks/useHoverModal.ts";
import Popover from "../../components/Popover.tsx";
import Container from "../../components/Container.tsx"

interface User {
    id: number;
    code: string;
    lastName: string;
    firstName: string;
    gender: String;
    birthday: number;
    status: boolean;
}

interface Student {
    id: number;
    semester: String;
    user: User;
}



const StudentManagePage = () => {
    const [listStudent, setListStudent] = useState([]);
    const [listActivityStudent, setListActivityStudent] = useState([]);
    const getPosition = (rect: DOMRect) => ({ top: rect.top + window.scrollY - 10, left: rect.left + rect.width - 200 });
    const { isModalOpen, modalPosition, handleMouseEnter, closeModal, targetValue } = useHoverModal(getPosition);

    const instructors: Student[] = listStudent;

    // const instructors: Student[] = [
    //     {
    //         id: 1,
    //         user: {
    //             code: 'binhtq7',
    //             lastName: 'Hà Thanh', firstName: 'Liêm',
    //         }
    //     },
    // { id: 2, code: 'binhtq7', last_name: 'Trần Quang', first_name: 'Bình', specialization_count: 2, subject_count: 12, activity_mark: 1700 },
    // { id: 3, code: 'ngahth', last_name: 'Hồ Thị Hồng', first_name: 'Nga', specialization_count: 2, subject_count: 28, activity_mark: 2900 },
    // { id: 4, code: 'hotb17', last_name: 'Trần Bá', first_name: 'Hộ', specialization_count: 2, subject_count: 10, activity_mark: 1000 },
    // { id: 5, code: 'vyta', last_name: 'Thái Anh', first_name: 'Vỹ', specialization_count: 2, subject_count: 20, activity_mark: 2000 },
    // ];

    const renderRow = (item: Student) => [
        // <th key={`item-id-${item.id}`} className="px-6 py-4">{item.id}</th>,
        <td key={`item-code-${item.id}`} className="px-6 py-4">{item.user.code}</td>,
        <td key={`item-name-${item.id}`} className="px-6 py-4">{item.user.lastName + ' ' + item.user.firstName}</td>,
        <td key={`item-gender-${item.id}`} className="px-6 py-4">{item.user.gender ? "Nam" : "Nữ"}</td>,
        <td key={`item-birthday-${item.id}`} className="px-6 py-4">{item.user.birthday}</td>,
        <td key={`item-status-${item.id}`} className={`px-6 py-4 font-bold ${item.user.status ? "text-green-400" : "text-red-500"}`}>
            {item.user.status ? "Hoạt động" : "Không hoạt động"}</td>,
        <td key={`item-${item.id}`} className="px-6 py-4 text-center">

            <Popover
                content={
                    <>
                        <div className="hover:bg-gray-200 rounded-xl">
                            <Button
                                type="button"
                                variant="btn-none"
                                className="w-1 h-[2.4rem] text-zinc-400 w-full"
                                onClick={(event) => handleMouseEnter(item, event)}
                            >
                                Sửa
                            </Button>
                        </div>
                        <div className="hover:bg-gray-200 rounded-xl">
                            <Button
                                type="button"
                                variant="btn-none"
                                className="w-1 h-[2.4rem] text-zinc-400 w-full"
                                onClick={(event) => handleMouseEnter(item, event)}
                            >
                                Xóa
                            </Button>
                        </div>
                    </>
                }
            >
                <Button
                    type="button"
                    variant="btn-none"
                    className="w-1 h-[2.4rem] text-zinc-400"
                    onClick={(event) => handleMouseEnter(item, event)}
                >
                    <FontAwesomeIcon icon={faEllipsis} />
                </Button>
            </Popover>
        </td>,
    ];

    useEffect(() => {
        getStudents();
    }, [])

    const getStudents = async () => {
        let response = await FetchAll();
        if (response && response.data) {
            setListStudent(response.data)
            const activeStudents = response.data.filter(item => item.user.status);
            setListActivityStudent(activeStudents);
        }
    }

    const handleEdit = () => {
        // <HoverModal />
    }

    return (
        <Container>
            <TitleHeader title="QUẢN LÝ SINH VIÊN" />
            <div className="w-full flex flex-wrap md:flex-nowrap py-3 gap-3">
                <CardBox icon={faUserGroup} title="Tổng số sinh viên" count={listStudent.length} />
                <CardBox icon={faUserCheck} title="Sinh viên đang hoạt động" count={listActivityStudent.length} />
                <CardBox icon={faUserXmark} title="Sinh viên dừng hoạt động" count={listStudent.length - listActivityStudent.length} />
            </div>

            <div className="w-full bg-white p-4 shadow-md rounded-2xl">
                <div>
                    <p className="text-[#9A9A9A] text-xs self-center mr-3 pb-2">Số lượng: <strong>30</strong></p>
                    <div className="flex flex-wrap gap-2">
                        <div className="columns-1">
                            <SelectBox
                                id="subject"
                                name="subject"
                                defaultOptionValue="Theo khu vực"
                                options={[{ value: '1', label: 'Hồ Chí Minh' }, { value: '2', label: 'Hà Nội' }]}
                            />
                        </div>
                        <div className="columns-1">
                            <SelectBox
                                id="semester"
                                name="semester"
                                defaultOptionValue="Theo học kỳ"
                                options={[{ value: '1', label: 'Spring 2023' }]}
                            />
                        </div>

                        <div className="columns-1">
                            <SelectBox
                                id="specialization"
                                name="specialization"
                                disable={true}
                                defaultOptionValue="Công nghệ thông tin"
                                options={[{ value: '1', label: 'Công nghệ thông tin' }]}
                            />
                        </div>
                        <div className="columns-1">
                            <Button
                                type="button"
                                variant="btn-none"
                                className="bg-gray-300 p-2 w-full md:w-40 self-center"
                            >
                                <FontAwesomeIcon icon={faFile} /> Import file excel
                            </Button>
                        </div>
                        <div className="columns-1">
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-gray-300 p-2 w-full md:w-40 self-center"
                            >
                                <FontAwesomeIcon icon={faFileExport} /> Export file excel
                            </Button>
                        </div>
                        <div className="columns-1">
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-blue-500 p-2 w-full md:w-40 self-center"
                            >
                                <FontAwesomeIcon icon={faPlus} /> Thêm sinh viên
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 overflow-x-auto">
                    <Tables
                        headers={["Mã Sinh Viên", "Họ Và Tên", "Giới tính", "Ngày sinh", "Trạng thái", ""]}
                        renderRow={renderRow}
                        data={instructors}
                    />
                </div>

            </div>
        </Container>
    );
}

export default StudentManagePage;