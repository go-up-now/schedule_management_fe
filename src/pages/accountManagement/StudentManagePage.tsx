import React, { useState, useEffect } from "react";
import TitleHeader from "../../components/TitleHeader.tsx";
import Button from "../../components/Button.tsx";
import SelectBox from "../../components/SelectBox.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tables from "../../components/tables/Tables.tsx";
import CardBox from "../../components/CartBox.tsx";
import { faEllipsis, faFile, faFileExport, faPlus, faUserCheck, faUserGroup, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { getAllStudents } from "../../services/StudentService.js";
import { getAllAreas } from "../../services/areaService.js";
import { getAllMajors } from "../../services/majorService.js";
import useHoverModal from "../../hooks/useHoverModal.ts";
import Popover from "../../components/Popover.tsx";
import Container from "../../components/Container.tsx"
import { useSelector } from 'react-redux';

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

interface Area {
    id: string;
    name: string;
}

interface Major {
    id: number;
    name: string;
}

const StudentManagePage = () => {
    const [listStudent, setListStudent] = useState([]);
    const [listStudentAPI, setListStudentAPI] = useState([]);
    const [listAreas, setListAreas] = useState<Area[]>([]);
    const [listMajors, setListMajors] = useState<Major[]>([]);
    const [listActivityStudent, setListActivityStudent] = useState([]);
    const getPosition = (rect: DOMRect) => ({ top: rect.top + window.scrollY - 10, left: rect.left + rect.width - 200 });
    const { isModalOpen, modalPosition, handleMouseEnter, closeModal, targetValue } = useHoverModal(getPosition);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const userInfo = useSelector((state) => state.user.userInfo);

    const instructors: Student[] = listStudent.length > 0 ? listStudent : listStudentAPI;

    const renderRow = (item: Student) => [
        // <th key={`item-id-${item.id}`} className="px-6 py-4">{item.id}</th>,
        <td key={`item-code-${item.id}`} className="px-6 py-4">{item.user.code}</td>,
        <td key={`item-name-${item.id}`} className="px-6 py-4">{item.user.lastName + ' ' + item.user.firstName}</td>,
        <td key={`item-gender-${item.id}`} className="px-6 py-4">{item.user.gender ? "Nam" : "Nữ"}</td>,
        <td key={`item-birthday-${item.id}`} className="px-6 py-4">{item.user.birthday}</td>,
        <td key={`item-status-${item.id}`} className={`px-6 py-4 font-bold ${item.user.status ? "text-green-400" : "text-red-500"}`}>
            {item.user.status ? "Đang học" : "Đã tốt nghiệp"}</td>,
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


    const areasOptions = listAreas.map(area => (
        {
            value: area.id,
            label: area.name
        }));
    // Thêm giá trị mặc định vào đầu mảng
    areasOptions.unshift({ value: "", label: "Theo khu vực" });

    const majorOptions = listMajors.map(major => ({
        value: major.id,
        label: major.name
    }));
    // Thêm giá trị mặc định vào đầu mảng
    majorOptions.unshift({ value: "", label: "Theo ngành học" });

    useEffect(() => {
        handleAPI();
    }, [])

    const handleAPI = async () => {
        // get majors
        let responseMajors = await getAllMajors();
        if (responseMajors && responseMajors.data) {
            setListMajors(responseMajors.data)
        }
        // get areas
        let responseAreas = await getAllAreas();
        if (responseAreas && responseAreas.data) {
            setListAreas(responseAreas.data)
        }

        // GET STUDENT
        setIsLoading(true)
        try {
            let response = await getAllStudents();
            if (response && response.data) {
                setTimeout(() => {
                    setListStudentAPI(response.data)
                    const activeStudents = response.data.filter(item => item.user.status);
                    setListActivityStudent(activeStudents);

                    // load dssv theo khu vực của admin
                    if (userInfo && userInfo.user) {
                        let userAreaId = userInfo.user.area.id
                        let students = response.data.filter(student => userAreaId == student.user.area.id)
                        setListStudent(students)
                    }
                    else if (userInfo) {
                        let userAreaId = userInfo.area.id
                        let students = response.data.filter(student => userAreaId == student.user.area.id)
                        setListStudent(students)
                    }
                }, 2000);

            }
        } catch (error) {
            console.log("Lỗi lấy thông tin sinh viên", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleArea = (event) => {
        let areaId = event.target.value; // areaId luôn là kiểu string
        console.log(areaId)
        let students = listStudentAPI.filter(student => areaId == student.user.area.id)
        setListStudent(students)
    }

    return (
        <Container>
            <TitleHeader title="QUẢN LÝ SINH VIÊN" />
            <div className="w-full flex flex-wrap md:flex-nowrap py-3 gap-3">
                <CardBox icon={faUserGroup} title="Tổng số sinh viên" count={listStudentAPI.length} />
                <CardBox icon={faUserCheck} title="Đang học" count={listActivityStudent.length} />
                <CardBox icon={faUserXmark} title="Đã tốt nghiệp" count={listStudentAPI.length - listActivityStudent.length} />
            </div>

            <div className="w-full bg-white p-4 shadow-md rounded-2xl">
                <div>
                    {/* <p className="text-[#9A9A9A] text-xs self-center mr-3 pb-2">Số lượng: <strong>30</strong></p> */}
                    <div className="flex flex-wrap gap-2">
                        <div className="columns-1">
                            <SelectBox
                                id="subject"
                                name="subject"
                                disableDefaultOption={true}
                                options={areasOptions}
                                defaultValue={userInfo && userInfo.user ? userInfo.user.area.id : userInfo ? userInfo.area.id : ""}
                                onChange={event => handleArea(event)}
                            />
                        </div>
                        <div className="columns-1">
                            <SelectBox
                                id="semester"
                                name="semester"
                                disableDefaultOption={true}
                                options={[
                                    { value: '', label: 'Theo học kỳ' },
                                    { value: '4', label: 'Fall 2023' },
                                    { value: '1', label: 'Spring 2024' },
                                    { value: '2', label: 'Summer 2024' },
                                    { value: '3', label: 'Fall 2024' }
                                ]}
                            />
                        </div>

                        <div className="columns-1">
                            <SelectBox
                                id="specialization"
                                name="specialization"
                                disableDefaultOption={true}
                                options={majorOptions}
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
                        advanced={true}
                        optionsValue={[
                            { value: '', label: 'Tất cả' },
                            { value: true, label: 'Đang học' },
                            { value: false, label: 'Đã tốt nghiệp' }
                        ]}
                        maxRow={5}
                        loading={isLoading}
                        advancedRowFilter
                    />
                </div>

            </div>
        </Container>
    );
}

export default StudentManagePage;