import React, { useState, useEffect } from "react";
import TitleHeader from "../../components/TitleHeader.tsx";
import Button from "../../components/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Container from "../../components/Container.tsx"
import { faEllipsis, faMoneyCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Tables from "../../components/tables/Tables.tsx";
import Popover from "../../components/Popover.tsx";
import TabPanel from "../../components/TabPanel.tsx"
import Modal from "../../components/Modal.tsx";
import RegistrationPage from "./RegistrationPage.tsx";
import { getAllSubjectByYearAndSemester } from '../../services/SubjectSerivce.js'
import { useDispatch } from 'react-redux';
import { setClazz, removeClazz } from "../../reducers/clazzSlice.tsx";
import { useSelector } from 'react-redux';

interface Subject {
    id: number;
    code: string;
    name: string;
    credits: number;
    year: number;
    semester: String;
    status: boolean;
    cost: number
}

const CourseRegistrationPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenConfirm, setIsModalConfirmOpen] = useState(false);
    const [listSubject, setListSubject] = useState([]);
    const [subject, setSubject] = useState<Subject[]>([]);
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal.isOpen);
    // const { isOpen } = props;
    // const [isModal, setIsModal] = useState(localStorage.getItem("ismodal"));


    // const subjects: Subject[] = [

    //     { id: 1, code: 'JAVA1', name: 'Java 1', credit: 3, year: 2024, semester: "SPRING", status: false },
    //     { id: 2, code: 'JAVA2', name: 'Java 2', credit: 3, year: 2024, semester: "SPRING", status: false },
    //     { id: 3, code: 'JAVA3', name: 'Java 3', credit: 3, year: 2024, semester: "SPRING", status: false }
    // ];

    const subjects: Subject[] = listSubject;

    const openModal = async (name, item) => {
        if (name === 'detail1') {
            setIsModalOpen(true);

            dispatch(removeClazz());
            dispatch(setClazz({
                subjectId: item.id
            }));
            setSubject(item);
        }
        else if (name === 'detail2') {
            // ấdasdasda
        }
        else if (name === 'cancel')
            setIsModalConfirmOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setIsModalConfirmOpen(false);
    }

    const subjects1: Subject[] = [

        { id: 1, code: 'JAVA1', name: 'Java 1', credits: 3, year: 2024, semester: "SPRING", status: true, cost: 20000 },
        { id: 2, code: 'JAVA2', name: 'Java 2', credits: 3, year: 2024, semester: "SPRING", status: true, cost: 20000 }
    ];

    const renderRow = (item: Subject) => [
        // <th key={`item-id-${item.id}`} className="px-6 py-4">{item.id}</th>,
        <td key={`item-code-${item.id}`} className="px-6 py-4">{item.code}</td>,
        <td key={`item-name-${item.id}`} className="px-6 py-4 font-bold">{item.name}</td>,
        <td key={`item-credit-${item.id}`} className="px-6 py-4">{item.credits}</td>,
        <td key={`item-year-${item.id}`} className="px-6 py-4">{item.cost}</td>,
        <td key={`item-semester-${item.id}`} className="px-6 py-4">SPRING 2024</td>,
        <td key={`item-status-${item.id}`} className={`px-6 py-4 font-bold ${item.status ? "text-green-400" : "text-red-500"}`}>
            {item.status ? "Đã đăng ký" : "Chưa đăng ký"}</td>,
        <td key={`item-${item.id}`} className="px-6 py-4 text-center">

            <Popover
                content={
                    <>
                        <div className="hover:bg-gray-200 rounded-xl">
                            <Button
                                type="button"
                                variant="btn-none"
                                className="w-1 h-[2.4rem] text-zinc-400 w-full"
                                onClick={() => openModal("detail1", item)}
                            >
                                Xem chi tiết
                            </Button>
                        </div>
                    </>
                }
            >
                <Button
                    type="button"
                    variant="btn-none"
                    className="w-1 h-[2.4rem] text-zinc-400"
                // onClick={(event) => handleMouseEnter(item, event)}
                >
                    <FontAwesomeIcon icon={faEllipsis} />
                </Button>
            </Popover>
        </td>,
    ];

    const renderRow1 = (item: Subject) => [
        // <th key={`item-id-${item.id}`} className="px-6 py-4">{item.id}</th>,
        <td key={`item-code-${item.id}`} className="px-6 py-4">{item.code}</td>,
        <td key={`item-name-${item.id}`} className="px-6 py-4 font-bold">{item.name}</td>,
        <td key={`item-credit-${item.id}`} className="px-6 py-4">{item.credits}</td>,
        <td key={`item-year-${item.id}`} className="px-6 py-4">{item.year}</td>,
        <td key={`item-semester-${item.id}`} className="px-6 py-4">{item.semester}</td>,
        <td key={`item-status-${item.id}`} className={`px-6 py-4 font-bold ${!item.status ? "text-green-400" : "text-red-500"}`}>
            {!item.status ? "Đã thanh toán" : "Chưa thanh toán"}</td>,
        <td key={`item-${item.id}`} className="px-6 py-4 text-center">

            <Popover
                content={
                    <>
                        <div className="hover:bg-gray-200 rounded-xl">
                            <Button
                                type="button"
                                variant="btn-none"
                                className="w-1 h-[2.4rem] text-zinc-400 w-full"
                                onClick={() => openModal("detail2", 1)}
                            >
                                Xem chi tiết
                            </Button>
                        </div>
                        <div className="hover:bg-gray-200 rounded-xl">
                            <Button
                                type="button"
                                variant="btn-none"
                                className="w-1 h-[2.4rem] text-zinc-400 w-full"
                                onClick={() => openModal("cancel", null)}
                            >
                                Hủy đăng ký
                            </Button>
                        </div>
                    </>
                }
            >
                <Button
                    type="button"
                    variant="btn-none"
                    className="w-1 h-[2.4rem] text-zinc-400"
                // onClick={(event) => handleMouseEnter(item, event)}
                >
                    <FontAwesomeIcon icon={faEllipsis} />
                </Button>
            </Popover>
        </td>,
    ];

    const CourseRegistrationTabs = [
        {
            id: "1",
            label: "Đăng Ký",
            content: (
                <>
                    <Tables
                        headers={["Mã Môn học", "Tên Môn Học", "Tín chỉ", "Học phí", "Học kỳ", "Trạng thái", ""]}
                        renderRow={renderRow}
                        data={subjects}
                    />
                </>
            )
        },
        {
            id: "2",
            label: "Môn Học Đã Đăng Ký",
            content: (
                <>
                    <div className="flex flex-wrap justify-end mb-2">
                        <div className="columns-1">
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-blue-500 p-2 w-full md:w-40 self-center"
                            >
                                <FontAwesomeIcon icon={faMoneyCheck} /> Thanh toán
                            </Button>
                        </div>
                    </div>
                    <Tables
                        headers={["Mã Môn học", "Tên Môn Học", "Tín chỉ", "Năm học", "Học kỳ", "Trạng thái", ""]}
                        renderRow={renderRow1}
                        data={subjects1}
                    />
                </>
            )
        }
    ]

    useEffect(() => {
        handleGetAllSubjectByYearAndSemester();
    }, [])

    useEffect(() => {
        setIsModalOpen(false); // Cập nhật state
    }, [isOpen])

    const handleGetAllSubjectByYearAndSemester = async () => {
        let response = await getAllSubjectByYearAndSemester();
        if (response && response.data) {
            setListSubject(response.data)
        }
    }

    return (
        <Container>
            <TitleHeader title="ĐĂNG KÝ MÔN HỌC" />
            <div className="w-full bg-white p-4 shadow-md rounded-2xl">
                <div className="flex flex-wrap justify-between">
                    <div>
                        <p className="text-[#9A9A9A] text-base self-center mr-3">Họ và tên: <strong>Nguyễn Văn A</strong></p>
                        <p className="text-[#9A9A9A] text-base self-center mr-3">Mã số sinh viên: <strong>PS28127</strong></p>
                        <p className="text-[#9A9A9A] text-base self-center mr-3">Chuyên ngành: <strong>Phát Triển Phần Mềm</strong></p>
                    </div>
                    <div>
                        <p className="text-[#9A9A9A] text-base self-center mr-3">Tổng số tín chỉ đăng ký: <strong>10</strong></p>
                        <p className="text-[#9A9A9A] text-base self-center mr-3">Tổng số tiền phải nộp: <strong>5.600.000đ</strong></p>
                        <p className="text-[#9A9A9A] text-base self-center mr-3 text-red-500"><strong>Số tín chỉ đăng ký phải nhiều hơn 10 tín chỉ</strong></p>
                    </div>
                </div>

                <div className="pt-5 overflow-x-auto">
                    <TabPanel
                        tabs={CourseRegistrationTabs}
                        activeClassName="text-black border-blue-500 border-b-2"
                        inactiveClassName="text-gray-500 hover:text-gray-600 hover:border-gray-300"
                    >
                    </TabPanel>
                    {/* <Tables
                        headers={["Mã Môn học", "Tên Môn Học", "Tín chỉ", "Năm học", "Học kỳ", "Trạng thái", ""]}
                        renderRow={renderRow}
                        data={instructors}
                    /> */}
                </div>

            </div>
            <Modal id={"CourseRegistraionModal"}
                width="max-w-7xl h-5/6"
                title={`Đăng ký học môn ${subject?.name}`}
                content={
                    <RegistrationPage
                        name={subject?.name}
                        code={subject?.code}
                        credit={subject?.credits}
                    />
                }
                positionButton="center"
                isOpen={isModalOpen}
                onClose={closeModal}
                type="message"
            >
            </Modal>
            <Modal id={"denyConfirmModal"}
                width="max-w-7xl"
                title={"Từ chối yêu của giảng dạy của "}
                content={<p>nội dung</p>}
                iconPopup={<FontAwesomeIcon icon={faCircleExclamation} className="text-yellow-600 w-24 h-24" />}
                positionButton="center"
                buttonCancel={<Button onClick={closeModal} hiddenParent="demoDate" variant="btn-secondary" type="button" size="text-sm px-6 py-3">Hủy</Button>}
                buttonConfirm={<Button onClick={closeModal} variant="btn-primary" type="button" size="text-sm px-6 py-3">Xác Nhận</Button>}
                isOpen={isModalOpenConfirm}
                onClose={closeModal}
                type="message"
            >
            </Modal>
        </Container>
    );
}

export default CourseRegistrationPage;